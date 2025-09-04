# azh-select

<div align="center">

![azh-select logo](https://banners.beyondco.de/Advanced%20Select%20Component.png?theme=light&packageManager=&packageName=npm%20install%20@alizharb/bootstrap-multiselect&pattern=circuitBoard&style=flat&description=Advanced%20Select%20Component%20for%20Bootstrap%205&md=1&showWatermark=0&fontSize=100px&images=selector)
**Advanced Select Component for Bootstrap 5**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952B3.svg)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![File Size](https://img.shields.io/badge/Size-~15KB-green.svg)](#installation)
[![No Dependencies](https://img.shields.io/badge/Dependencies-Bootstrap%20Only-blue.svg)](#requirements)

_Powerful, lightweight, and highly customizable select component with search, tags, remote API loading, custom templates, and full dark mode support._

[📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [💡 Examples](#examples) • [🎨 Themes](#theming) • [🔧 API Reference](#api-reference)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 **Core Features**

- **Single & Multiple Selection** - Standard and multi-select modes
- **Real-time Search** - Filter options as you type
- **Tag Creation** - Users can create new options dynamically
- **Clear Button** - Easy reset functionality
- **Keyboard Navigation** - Full accessibility support
- **Form Integration** - Works seamlessly with HTML forms

</td>
<td width="50%">

### 🚀 **Advanced Features**

- **Remote API Loading** - Load data from REST endpoints
- **Custom Templates** - Rich HTML templates for options
- **Dark/Light Themes** - Bootstrap 5 theme integration
- **Event System** - Comprehensive event callbacks
- **Responsive Design** - Mobile-first responsive layout
- **Performance Optimized** - Efficient rendering for large datasets

</td>
</tr>
</table>

---

## 🎯 Quick Start

### Installation

#### Option 1: Direct Download

```html
<!-- CSS -->
<link rel="stylesheet" href="path/to/dist/css/azh-select.min.css" />
<!-- JavaScript -->
<script src="path/to/azh-select.js"></script>
```

#### Option 2: CDN (Coming Soon)

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/azh-select@1.0/dist/azh-select.min.css"
/>
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/azh-select@1.0/dist/azh-select.min.js"></script>
```

#### Option 3: NPM (Coming Soon)

```bash
npm install @alizharb/bootstrap-multiselect
```

### Requirements

- **Bootstrap 5.0+** (Required for styling)
- **Modern Browser** with ES6+ support

### Basic Usage

```html
<!-- Include Bootstrap 5 -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

<!-- Include azh-select -->
<link rel="stylesheet" href="azh-select.min.css" />
<script src="azh-select.min.js"></script>

<!-- Create your select -->
<select class="form-select azh-select" data-placeholder="Choose an option">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>

<!-- Initialize -->
<script>
  document.addEventListener("DOMContentLoaded", () => {
    azhSelect.init(".azh-select");
  });
</script>
```

---

## 💡 Examples

### Basic Select

```html
<select class="form-select azh-select" data-placeholder="Select an option">
  <option value="apple">🍎 Apple</option>
  <option value="banana">🍌 Banana</option>
  <option value="cherry">🍒 Cherry</option>
</select>
```

### Searchable Multi-Select

```html
<select
  class="form-select azh-select"
  multiple
  data-search="true"
  data-placeholder="Search and select multiple"
>
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
  <option value="php">PHP</option>
</select>
```

### Tags (Creatable Options)

```html
<select
  class="form-select azh-select"
  multiple
  data-search="true"
  data-tags="true"
  data-placeholder="Type to create new tags"
>
  <option value="frontend">Frontend</option>
  <option value="backend">Backend</option>
  <option value="fullstack">Full Stack</option>
</select>
```

### Remote API Integration

```html
<select
  class="form-select azh-select"
  data-remote="true"
  data-endpoint="https://api.example.com/users"
  data-search="true"
  data-value-field="id"
  data-label-field="name"
  data-placeholder="Search users..."
></select>
```

### Custom Templates

```javascript
azhSelect.init("#customSelect", {
  templateOption: (opt) => {
    return `<i class="bi bi-star text-warning me-2"></i>${opt.label}`;
  },
  templateValue: (opt) => {
    return `<span class="badge bg-primary">${opt.label}</span>`;
  },
});
```

---

## ⚙️ Configuration

### Data Attributes

| Attribute          | Type    | Default       | Description                       |
| ------------------ | ------- | ------------- | --------------------------------- |
| `data-search`      | Boolean | `false`       | Enable search functionality       |
| `data-clear`       | Boolean | `false`       | Show clear button                 |
| `data-tags`        | Boolean | `false`       | Allow tag creation                |
| `data-remote`      | Boolean | `false`       | Enable remote data loading        |
| `data-endpoint`    | String  | `null`        | API endpoint URL                  |
| `data-placeholder` | String  | `"Select..."` | Placeholder text                  |
| `data-max`         | Number  | `null`        | Maximum selections (multi-select) |
| `data-value-field` | String  | `"id"`        | API response value field          |
| `data-label-field` | String  | `"name"`      | API response label field          |
| `data-min-query`   | Number  | `1`           | Minimum chars for remote search   |
| `data-delay`       | Number  | `300`         | Remote search delay (ms)          |
| `data-preload`     | Boolean | `false`       | Preload remote data               |
| `data-bs-theme`    | String  | `"light"`     | Bootstrap theme                   |

### JavaScript Options

```javascript
azhSelect.init(".azh-select", {
  // Template functions
  templateOption: (opt) => opt.label,
  templateValue: (opt) => opt.label,

  // Internationalization
  i18n: {
    placeholder: "Select...",
    clear: "Clear",
    noResults: "No results found",
  },
});
```

---

## 🎨 Theming

azh-select fully supports Bootstrap 5's theme system with automatic dark/light mode detection.

### Theme Integration

```html
<!-- Global theme -->
<html data-bs-theme="dark">
  <!-- Individual select theme -->
  <select class="form-select azh-select" data-bs-theme="dark">
    <option value="1">Dark themed option</option>
  </select>
</html>
```

### Custom Styling

```css
.my-custom-select {
  --azh-bg: #f0f8ff;
  --azh-border: #4682b4;
  --azh-text: #1e3a8a;
  --azh-hover-bg: rgba(70, 130, 180, 0.1);
  --azh-selected-bg: rgba(70, 130, 180, 0.2);
}
```

### Dynamic Theme Switching

```javascript
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-bs-theme", newTheme);
}
```

---

## 🔧 API Reference

### Global Methods

| Method                   | Parameters          | Description                |
| ------------------------ | ------------------- | -------------------------- |
| `azhSelect.init()`       | `selector, options` | Initialize select elements |
| `azhSelect.get()`        | `selector`          | Get instance by selector   |
| `azhSelect.destroy()`    | `selector`          | Destroy specific instance  |
| `azhSelect.destroyAll()` | -                   | Destroy all instances      |

### Instance Methods

| Method      | Description           |
| ----------- | --------------------- |
| `clear()`   | Clear all selections  |
| `open()`    | Open dropdown         |
| `close()`   | Close dropdown        |
| `toggle()`  | Toggle dropdown state |
| `destroy()` | Destroy instance      |

### Events

| Event               | Trigger              | Detail                       |
| ------------------- | -------------------- | ---------------------------- |
| `azh:change`        | Selection changes    | `{instance}`                 |
| `azh:clear`         | Clear button clicked | `{instance}`                 |
| `azh:open`          | Dropdown opens       | `{instance}`                 |
| `azh:close`         | Dropdown closes      | `{instance}`                 |
| `azh:optionCreated` | New tag created      | `{instance, value}`          |
| `azh:remoteLoaded`  | Remote data loaded   | `{instance, query, options}` |
| `azh:error`         | Remote API error     | `{instance, error}`          |

### Event Usage

```javascript
document
  .querySelector("#mySelect")
  .addEventListener("azh:change", function (e) {
    console.log("Selection changed:", e.target.value);
  });

document
  .querySelector("#mySelect")
  .addEventListener("azh:optionCreated", function (e) {
    console.log("New tag created:", e.detail.value);
  });
```

---

## 🌐 Remote API Integration

### Server Requirements

Your API should return JSON arrays:

```json
[
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
]
```

### Search Implementation

When search is enabled, queries are sent as URL parameters:

```
GET /api/users?q=john
```

### Server Examples

<details>
<summary><strong>PHP (Laravel)</strong></summary>

```php
Route::get('/api/users', function (Request $request) {
    $query = $request->get('q');

    return User::when($query, function ($q) use ($query) {
        return $q->where('name', 'LIKE', "%{$query}%")
                ->orWhere('email', 'LIKE', "%{$query}%");
    })
    ->select('id', 'name', 'email')
    ->limit(50)
    ->get();
});
```

</details>

<details>
<summary><strong>Node.js (Express)</strong></summary>

```javascript
app.get("/api/users", (req, res) => {
  const query = req.query.q;
  let sql = "SELECT id, name, email FROM users";
  let params = [];

  if (query) {
    sql += " WHERE name LIKE ? OR email LIKE ?";
    params = [`%${query}%`, `%${query}%`];
  }

  db.query(sql + " LIMIT 50", params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
```

</details>

<details>
<summary><strong>Python (Django)</strong></summary>

```python
from django.http import JsonResponse
from django.db.models import Q

def users_api(request):
    query = request.GET.get('q', '')
    users = User.objects.all()

    if query:
        users = users.filter(
            Q(name__icontains=query) | Q(email__icontains=query)
        )

    return JsonResponse(
        list(users.values('id', 'name', 'email')[:50]),
        safe=False
    )
```

</details>

---

## 🔧 Advanced Usage

### Form Integration

```html
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label class="form-label">Required Field</label>
    <select class="form-select azh-select" name="category" required>
      <option value="">Select...</option>
      <option value="tech">Technology</option>
      <option value="design">Design</option>
    </select>
    <div class="invalid-feedback">Please select a category.</div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Framework Integration

<details>
<summary><strong>React</strong></summary>

```jsx
import React, { useEffect, useRef } from "react";
import azhSelect from "azh-select";

function AzhSelectComponent({ options, value, onChange }) {
  const selectRef = useRef();

  useEffect(() => {
    azhSelect.init(selectRef.current);
    selectRef.current.addEventListener("azh:change", onChange);

    return () => azhSelect.destroy(selectRef.current);
  }, []);

  return (
    <select ref={selectRef} className="form-select azh-select">
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
```

</details>

<details>
<summary><strong>Vue.js</strong></summary>

```vue
<template>
  <select ref="select" class="form-select azh-select" v-model="value">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
import azhSelect from "azh-select";

export default {
  props: ["options", "value"],
  mounted() {
    azhSelect.init(this.$refs.select);
    this.$refs.select.addEventListener("azh:change", () => {
      this.$emit("input", this.$refs.select.value);
    });
  },
  beforeDestroy() {
    azhSelect.destroy(this.$refs.select);
  },
};
</script>
```

</details>

---

## 🛠️ Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/alizharb/azh-select.git
cd azh-select

# Install dependencies
npm install

# Build for production
npm run build

# Development with live reload
npm run dev

# Run tests
npm test
```

### Project Structure

```
azh-select/
├── dist/
│   ├── js/
│   │   ├── azh-select.js
│   │   └── azh-select.min.js
│   ├── css/
│   │   ├── azh-select.css
│   │   └── azh-select.min.css
│   ├── scss/
│   │   └── azh-select.scss
│   └── less/
│       └── azh-select.less
├── types/       # TypeScript typings
```

---

## 🧪 Browser Support

| Browser | Version | Notes           |
| ------- | ------- | --------------- |
| Chrome  | 60+     | ✅ Full support |
| Firefox | 55+     | ✅ Full support |
| Safari  | 12+     | ✅ Full support |
| Edge    | 79+     | ✅ Full support |
| IE      | ❌      | Not supported   |

### Feature Support

- **CSS Custom Properties**: All supported browsers
- **Fetch API**: All supported browsers
- **Custom Events**: All supported browsers
- **ES6 Classes**: All supported browsers

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Ways to Contribute

- 🐛 **Bug Reports** - Found an issue? Let us know!
- 💡 **Feature Requests** - Have an idea? Share it!
- 📝 **Documentation** - Help improve our docs
- 🔧 **Code** - Submit pull requests
- 🧪 **Testing** - Help test new features

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Submit a pull request with a clear description

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Bootstrap Team** - For the amazing CSS framework
- **Contributors** - Everyone who has contributed to this project
- **Community** - For feedback, bug reports, and feature suggestions

---

## 📞 Support

- 📖 **Documentation**: [Full Documentation](https://alizharb.github.io/azh-select)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/alizharb/azh-select/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/alizharb/azh-select/discussions)
- 📧 **Email**: harbzali@gmail.com

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by [Ali Harb](https://github.com/alizharb)

</div>
