export interface IField {
    name: string;
    label?: string;
    type: 'text' | 'number' | 'date' | 'textarea' | 'email' | 'password' | 'file' | 'select' | 'checkbox' | 'radio' | 'color' | 'range' | 'button' | 'submit' | 'reset' | 'hidden' | 'image' | 'url' | 'tel' | 'search';
    required?: boolean;
    disabled?: boolean;
    options?: { value: string; label: string }[]; // For 'select' and 'radio'
    value?: string; // Default value for specific input types
    accept?: string; // For file inputs
    placeholder?: string; // Placeholder for inputs
    multiple?: boolean; // For file or select inputs
}
