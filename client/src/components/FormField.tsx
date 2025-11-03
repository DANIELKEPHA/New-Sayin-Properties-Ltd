import React from "react";
import {
    ControllerRenderProps,
    FieldValues,
    useFormContext,
    useFieldArray,
} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Edit, X, Plus } from "lucide-react";
import { registerPlugin } from "filepond";
import { FilePond, FilePondProps } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { LucideIcon } from "lucide-react";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface Option {
    value: string;
    label: string;
    icon?: LucideIcon;
}

interface FormFieldProps {
    name: string;
    label: string;
    type?:
        | "text"
        | "email"
        | "textarea"
        | "number"
        | "select"
        | "multiselect"
        | "switch"
        | "password"
        | "file"
        | "multi-input";
    placeholder?: string;
    options?: Option[];
    accept?: string;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
    value?: string;
    disabled?: boolean;
    multiple?: boolean;
    isIcon?: boolean;
    initialValue?: string | number | boolean | string[] | File[];
}

export const CustomFormField: React.FC<FormFieldProps> = ({
                                                              name,
                                                              label,
                                                              type = "text",
                                                              placeholder,
                                                              options,
                                                              accept,
                                                              className,
                                                              inputClassName,
                                                              labelClassName,
                                                              disabled = false,
                                                              multiple = false,
                                                              isIcon = false,
                                                              initialValue,
                                                          }) => {
    const { control } = useFormContext();

    const renderFormControl = (
        field: ControllerRenderProps<FieldValues, string>
    ) => {
        switch (type) {
            case "textarea":
                return (
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        rows={3}
                        className={`border-gray-200 p-4 ${inputClassName}`}
                    />
                );

            case "select":
                return (
                    <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                        disabled={disabled}
                    >
                        <SelectTrigger className={`w-full border-gray-200 p-4 ${inputClassName}`}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    <div className="flex items-center gap-2">
                                        {option.icon && <option.icon className="w-4 h-4" />}
                                        <span>{option.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case "multiselect":
                return (
                    <MultiSelectField
                        field={field}
                        options={options || []}
                        placeholder={placeholder}
                        inputClassName={inputClassName}
                    />
                );

            case "switch":
                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={name}
                            disabled={disabled}
                        />
                        <FormLabel htmlFor={name} className={labelClassName}>
                            {label}
                        </FormLabel>
                    </div>
                );

            case "file":
                return (
                    <FilePond
                        className={inputClassName}
                        files={field.value || []}
                        onupdatefiles={(fileItems) => {
                            const files = fileItems.map((item) => item.file);
                            field.onChange(multiple ? files : files[0] || null);
                        }}
                        allowMultiple={multiple}
                        acceptedFileTypes={accept ? accept.split(",") : undefined}
                        labelIdle={`Drag & Drop your files or <span class="filepond--label-action">Browse</span>`}
                        credits={false}
                    />
                );

            case "number":
                return (
                    <Input
                        type="number"
                        placeholder={placeholder}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        className={`border-gray-200 p-4 ${inputClassName}`}
                        disabled={disabled}
                    />
                );

            case "multi-input":
                return (
                    <MultiInputField
                        name={name}
                        control={control}
                        placeholder={placeholder}
                        inputClassName={inputClassName}
                    />
                );

            default:
                return (
                    <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        className={`border-gray-200 p-4 ${inputClassName}`}
                        disabled={disabled}
                    />
                );
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={initialValue}
            render={({ field }) => (
                <FormItem className={`relative ${className}`}>
                    {type !== "switch" && (
                        <div className="flex justify-between items-center mb-1">
                            <FormLabel className={`text-sm ${labelClassName}`}>
                                {label}
                            </FormLabel>
                            {!disabled && isIcon && type !== "file" && type !== "multi-input" && (
                                <Edit className="w-4 h-4 text-customgreys-dirtyGrey" />
                            )}
                        </div>
                    )}
                    <FormControl>
                        {renderFormControl({
                            ...field,
                            value: field.value !== undefined ? field.value : initialValue,
                        })}
                    </FormControl>
                    <FormMessage className="text-red-400" />
                </FormItem>
            )}
        />
    );
};

/* -------------------------------------------------------------------------- */
/*                               MULTISELECT FIELD                              */
/* -------------------------------------------------------------------------- */
interface MultiSelectFieldProps {
    field: ControllerRenderProps<FieldValues, string>;
    options: Option[];
    placeholder?: string;
    inputClassName?: string;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
                                                               field,
                                                               options,
                                                               placeholder,
                                                               inputClassName,
                                                           }) => {
    const selected = Array.isArray(field.value) ? field.value : [];

    const toggle = (value: string) => {
        const newValue = selected.includes(value)
            ? selected.filter((v: string) => v !== value)
            : [...selected, value];
        field.onChange(newValue);
    };

    return (
        <div className={`border rounded-md p-2 min-h-[40px] ${inputClassName}`}>
            {selected.length === 0 && (
                <span className="text-gray-400">{placeholder || "Select items..."}</span>
            )}
            <div className="flex flex-wrap gap-2">
                {selected.map((value: string) => {
                    const option = options.find((o) => o.value === value);
                    return (
                        <span
                            key={value}
                            className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm"
                        >
              {option?.icon && <option.icon className="w-3 h-3" />}
                            {option?.label || value}
                            <button
                                type="button"
                                onClick={() => toggle(value)}
                                className="ml-1 text-primary-700 hover:text-primary-900"
                            >
                <X className="w-3 h-3" />
              </button>
            </span>
                    );
                })}
            </div>
            <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                {options
                    .filter((o) => !selected.includes(o.value))
                    .map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => toggle(option.value)}
                            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded flex items-center gap-2"
                        >
                            {option.icon && <option.icon className="w-4 h-4" />}
                            <span>{option.label}</span>
                        </button>
                    ))}
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/*                               MULTI-INPUT FIELD                              */
/* -------------------------------------------------------------------------- */
interface MultiInputFieldProps {
    name: string;
    control: any;
    placeholder?: string;
    inputClassName?: string;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
                                                             name,
                                                             control,
                                                             placeholder,
                                                             inputClassName,
                                                         }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="space-y-2">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                    <FormField
                        control={control}
                        name={`${name}.${index}`}
                        render={({ field }) => (
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={placeholder}
                                    className={`flex-1 border-gray-200 p-4 ${inputClassName}`}
                                />
                            </FormControl>
                        )}
                    />
                    <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                onClick={() => append("")}
                variant="outline"
                size="sm"
                className="text-customgreys-dirtyGrey"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
            </Button>
        </div>
    );
};