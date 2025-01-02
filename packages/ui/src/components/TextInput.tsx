"use client"

export const TextInput = ({
    placeholder,
    handleChange,
    label
}: {
    placeholder: string,
    handleChange: any ,
    label: string
}) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium test-gray-900">
                {label}
            </label>
            <input onChange={(e)=> handleChange(e.target.value)} type="text" id="first_name" className="bg-gray-100 border-gray-600 text-gray-900 text-sm rounded-lg focusing-blue-500 focus:border-red block w-full p-3" placeholder={placeholder} />
        </div>
    )
}