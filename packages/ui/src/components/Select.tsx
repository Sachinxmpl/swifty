
export const Select = (
    {
        onSelect,
        options
    }: {
        // eslint-disable-next-line no-unused-vars
        onSelect: (value: string) => void,
        options: { key: string, value: string }[]
    }
) => {
    return (
        <div className="relative w-full">
            <select
                onChange={(e) => { onSelect(e.target.value) }}
                className="appearance-none bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 pr-10 shadow-sm transition ease-in-out duration-200"
            >
                <option value="" disabled selected>Select an option</option>
                {
                    options.map((option) => (
                        <option key={option.key} value={option.key}>
                            {option.value}
                        </option>
                    ))
                }
            </select>
            {/* Custom Arrow */}
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 14l-6-6h12l-6 6z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
};
