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
            <label className="block mb-2 test-sm font-medium test-gray-900">
                {label}
            </label>
            <input onChange={(e) => onChange(e.target.value)} type="text" id="first_name" className="bg-gray-50 border-gray-300 test-gray-900 test-sm rounded-lg focusing-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
        </div>
    )
}