/*!
 * Bootstrap Multiselect (Azh Select)
 * ----------------------------------
 * TypeScript Definitions for Azh Select
 *
 * Provides type definitions for developers using TypeScript
 * with the Azh Select plugin.
 *
 * Features:
 *  - Searchable dropdown options
 *  - Tags / Creatable options
 *  - Clear button
 *  - Remote data loading
 *  - Single and multiple select modes
 *  - Theming support (light/dark)
 *
 * Author: Ali Harb
 * Repository: https://github.com/alizharb/bootstrap-multiselect
 * License: MIT
 * Version: 1.0.0
 */

//////////////////////////////
// Option interface
//////////////////////////////
export interface AzhOption {
    /** The option's value (used in <option value="...">) */
    value: string;
    /** The option's display label */
    label: string;
    /** Whether the option is initially selected */
    selected?: boolean;
    /** Whether the option is disabled */
    disabled?: boolean;
    /** Index in the original <select> options list */
    index?: number;
    /** Internal flag for creatable tag options */
    creatable?: boolean;
}

//////////////////////////////
// Options for initializing the plugin
//////////////////////////////
export interface AzhSelectOptions {
    /** Enable search input */
    search?: boolean;
    /** Show a clear button */
    clear?: boolean;
    /** Enable tagging / creatable options */
    tags?: boolean;
    /** Virtual rendering for large lists (not implemented yet) */
    virtual?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** Maximum number of selections allowed */
    max?: number | null;
    /** Load options remotely */
    remote?: boolean;
    /** Endpoint URL for remote options */
    endpoint?: string | null;
    /** Minimum query length to trigger remote search */
    minQuery?: number;
    /** Delay in milliseconds for remote search */
    delay?: number;
    /** Template for rendering options in dropdown */
    templateOption?: (opt: AzhOption) => string;
    /** Template for rendering selected values */
    templateValue?: (opt: AzhOption) => string;
    /** Internationalization strings */
    i18n?: {
        placeholder?: string;
        clear?: string;
        noResults?: string;
    };
}

//////////////////////////////
// Main class
//////////////////////////////
export class AzhSelect {
    /**
     * Create a new AzhSelect instance
     * @param element The HTMLSelectElement to transform
     * @param options Optional configuration
     */
    constructor(element: HTMLSelectElement, options?: AzhSelectOptions);

    /** Opens the dropdown */
    open(): void;
    /** Closes the dropdown */
    close(): void;
    /** Toggles the dropdown open/closed */
    toggle(): void;
    /** Clears all selected values */
    clear(): void;
    /** Destroys the instance and restores original <select> */
    destroy(): void;
}

//////////////////////////////
// Global API
//////////////////////////////
export const azhSelect: {
    /** List of all AzhSelect instances */
    instances: AzhSelect[];
    /**
     * Initialize all <select> elements matching the selector
     * @param selector CSS selector for <select> elements
     * @param options Optional AzhSelectOptions
     */
    init(selector: string, options?: AzhSelectOptions): void;
    /**
     * Get an existing instance by selector
     * @param selector CSS selector
     */
    get(selector: string): AzhSelect | undefined;
    /**
     * Destroy a specific instance
     * @param selector CSS selector
     */
    destroy(selector: string): void;
    /** Destroy all initialized instances */
    destroyAll(): void;
};
