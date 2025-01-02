"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label
}: {
    placeholder: string,
    onChange: (value: string) => void,
    label: string
}) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium test-gray-900">
                {label}
            </label>
            <input onChange={(e) => onChange(e.target.value)} type="text" id="first_name" className="bg-gray-100 border-gray-600 text-gray-900 text-sm rounded-lg focusing-blue-500 focus:border-red block w-full p-3" placeholder={placeholder} />
        </div>
    )
}