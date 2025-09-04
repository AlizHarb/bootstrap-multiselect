/*!
 * Bootstrap Multiselect (Azh Select)
 * ----------------------------------
 * A lightweight, Bootstrap-styled multiselect dropdown with:
 *  - Searchable options
 *  - Tagging / Creatable options
 *  - Clear button
 *  - Remote data loading
 *  - Multiple and single select modes
 *  - Theming (light/dark, Bootstrap v5)
 *
 * Author: Ali Harb
 * Repository: https://github.com/alizharb/bootstrap-multiselect
 * License: MIT
 * Version: 1.0.3
 *
 * NOTE:
 * This is the unminified distribution file.
 * For production, use `dist/js/azh-select.min.js`.
 */

class AzhSelect {
  constructor(element, options = {}) {
    this.el = element;
    this.options = this._mergeOptions(options);
    this.isMultiple = this.el.multiple;
    this.isOpen = false;
    this.selected = [];
    this.filteredOptions = [];
    this._remoteTimer = null;
    this._build();
    this._bindEvents();
    this._render();
    this._applyTheme();
  }

  _mergeOptions(options) {
    const dataset = this.el.dataset;
    return Object.assign(
      {
        search: dataset.search === "true",
        clear: dataset.clear === "true",
        tags: dataset.tags === "true",
        virtual: dataset.virtual === "true",
        placeholder: dataset.placeholder || "Select...",
        max: dataset.max ? parseInt(dataset.max, 10) : null,
        remote: dataset.remote === "true",
        endpoint: dataset.endpoint || null,
        minQuery: dataset.minQuery ? parseInt(dataset.minQuery, 10) : 1,
        delay: dataset.delay ? parseInt(dataset.delay, 10) : 300,
        templateOption: options.templateOption || ((opt) => opt.label),
        templateValue: options.templateValue || ((opt) => opt.label),
        i18n: Object.assign(
          {
            placeholder: "Select...",
            clear: "Clear",
            noResults: "No results found",
          },
          options.i18n || {}
        ),
      },
      options
    );
  }

  _build() {
    this.el.style.display = "none";

    this.wrapper = document.createElement("div");
    this.wrapper.className = "azh-select-wrapper";

    this.display = document.createElement("div");
    this.display.className = "azh-select-display";
    this.display.tabIndex = 0;
    this.display.innerHTML = `<span class="azh-placeholder">${this.options.i18n.placeholder}</span>`;

    this.dropdown = document.createElement("div");
    this.dropdown.className = "azh-select-dropdown";

    if (this.options.search) {
      this.searchInput = document.createElement("input");
      this.searchInput.type = "text";
      this.searchInput.className = "azh-select-search form-control";
      this.searchInput.placeholder = "Search...";
      this.dropdown.appendChild(this.searchInput);
    }

    this.list = document.createElement("div");
    this.list.className = "azh-select-options";
    this.dropdown.appendChild(this.list);

    if (this.options.clear) {
      this.clearBtn = document.createElement("button");
      this.clearBtn.type = "button";
      this.clearBtn.className = "azh-clear btn btn-sm btn-link";
      this.clearBtn.innerText = this.options.i18n.clear;
      this.dropdown.appendChild(this.clearBtn);
    }

    this.wrapper.appendChild(this.display);
    this.wrapper.appendChild(this.dropdown);
    this.el.parentNode.insertBefore(this.wrapper, this.el.nextSibling);

    this._parseOptions();

    if (this.options.remote && this.el.dataset.preload === "true") {
      this._fetchRemote("");
    }
  }

  _applyTheme() {
    const theme =
      this.el.dataset.bsTheme ||
      document.documentElement.dataset.bsTheme ||
      document.body.dataset.bsTheme ||
      "light";
    this.wrapper.setAttribute("data-bs-theme", theme);
  }

  _parseOptions() {
    this.optionsData = Array.from(this.el.options).map((o, i) => ({
      value: o.value,
      label: o.text,
      selected: o.selected,
      disabled: o.disabled,
      index: i,
    }));
    this.filteredOptions = [...this.optionsData];
  }

  _render() {
    this.list.innerHTML = "";

    if (this.filteredOptions.length === 0) {
      this.list.innerHTML = `<div class="azh-no-results">${this.options.i18n.noResults}</div>`;
      return;
    }

    this.filteredOptions.forEach((opt) => {
      const item = document.createElement("div");
      item.className = "azh-option";
      if (opt.disabled) item.classList.add("disabled");
      if (opt.selected) item.classList.add("selected");
      item.dataset.value = opt.value;
      item.innerHTML = this.options.templateOption(opt);
      this.list.appendChild(item);
    });

    this._updateDisplay();
    this._trigger("afterRender");
  }

  _updateDisplay() {
    const selectedOpts = this.optionsData.filter((o) => o.selected);

    if (selectedOpts.length === 0) {
      this.display.innerHTML = `<span class="azh-placeholder">${this.options.i18n.placeholder}</span>`;
      return;
    }

    if (this.isMultiple) {
      this.display.innerHTML = selectedOpts
        .map((o) => this.options.templateValue(o))
        .join(" ");
    } else {
      this.display.innerHTML = this.options.templateValue(selectedOpts[0]);
    }
  }

  _bindEvents() {
    this.display.addEventListener("click", () => this.toggle());

    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase();

        if (this.options.remote && val.length >= this.options.minQuery) {
          clearTimeout(this._remoteTimer);
          this._remoteTimer = setTimeout(
            () => this._fetchRemote(val),
            this.options.delay
          );
          return;
        }

        this.filteredOptions = this.optionsData.filter((o) =>
          o.label.toLowerCase().includes(val)
        );

        if (this.options.tags && val && !this._hasOption(val)) {
          this.filteredOptions.push({
            value: val,
            label: `➕ Add "${val}"`,
            selected: false,
            creatable: true,
          });
        }

        this._render();
      });
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", () => {
        this.clear();
        this._trigger("clear");
      });
    }

    this.list.addEventListener("click", (e) => {
      const item = e.target.closest(".azh-option");
      if (!item || item.classList.contains("disabled")) return;
      const value = item.dataset.value;

      const opt = this.filteredOptions.find((o) => o.value === value);

      if (opt && opt.creatable) {
        this._createTag(value);
      } else {
        this._select(value);
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.wrapper.contains(e.target)) {
        this.close();
      }
    });
  }

  _select(value) {
    const opt = this.optionsData.find((o) => o.value === value);
    if (!opt) return;

    if (this.isMultiple) {
      opt.selected = !opt.selected;
    } else {
      this.optionsData.forEach((o) => (o.selected = false));
      opt.selected = true;
      this.close();
    }

    this.el.querySelectorAll("option").forEach((o) => {
      o.selected = this.optionsData.find((x) => x.value === o.value).selected;
    });

    this._render();
    this._trigger("change");
  }

  _createTag(value) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    option.selected = true;
    this.el.appendChild(option);

    this._parseOptions();
    this._render();
    this._trigger("optionCreated", { value });
  }

  _hasOption(val) {
    return this.optionsData.some(
      (o) => o.value.toLowerCase() === val.toLowerCase()
    );
  }

  _fetchRemote(query = "") {
    if (!this.options.endpoint) return;

    let url = this.options.endpoint;
    if (query)
      url += (url.includes("?") ? "&" : "?") + "q=" + encodeURIComponent(query);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const valueField = this.el.dataset.valueField || "id";
        const labelField = this.el.dataset.labelField || "name";

        this.el.innerHTML = "";
        data.forEach((item) => {
          const value = item[valueField] ?? item.id;
          const label =
            item[labelField] ?? item.name ?? item.title ?? String(value);
          const opt = document.createElement("option");
          opt.value = value;
          opt.textContent = label;
          this.el.appendChild(opt);
        });

        this._parseOptions();

        if (query) {
          const q = query.toLowerCase();
          this.filteredOptions = this.optionsData.filter((o) =>
            o.label.toLowerCase().includes(q)
          );
        } else {
          this.filteredOptions = [...this.optionsData];
        }

        this._render();
        this._trigger("remoteLoaded", { query, options: this.optionsData });
      })
      .catch((err) => this._trigger("error", { error: err }));
  }

  clear() {
    this.optionsData.forEach((o) => (o.selected = false));
    this.el.querySelectorAll("option").forEach((o) => (o.selected = false));
    this._render();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.dropdown.classList.add("open");
    this.isOpen = true;
    this._trigger("open");
  }

  close() {
    this.dropdown.classList.remove("open");
    this.isOpen = false;
    this._trigger("close");
  }

  destroy() {
    this.wrapper.remove();
    this.el.style.display = "";
    this._trigger("destroy");
  }

  _trigger(name, detail = {}) {
    const event = new CustomEvent(`azh:${name}`, {
      detail: { instance: this, ...detail },
    });
    this.el.dispatchEvent(event);
  }
}

/* Global API */
const azhSelect = {
  instances: [],
  init(selector, options = {}) {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.classList.contains("azh-select")) return;
      const instance = new AzhSelect(el, options);
      this.instances.push(instance);
    });
  },
  get(selector) {
    return this.instances.find((inst) => inst.el.matches(selector));
  },
  destroy(selector) {
    const inst = this.get(selector);
    if (inst) {
      inst.destroy();
      this.instances = this.instances.filter((i) => i !== inst);
    }
  },
  destroyAll() {
    this.instances.forEach((inst) => inst.destroy());
    this.instances = [];
  },
};

window.azhSelect = azhSelect;
