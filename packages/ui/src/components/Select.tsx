
export const Select = (
    {
        onSelect,
        options
    }: {
        // eslint-disable-next-line no-unused-vars
        onSelect: (value: string) => void,
        options: any[]
    }
) => {
    return (
        <>
            <select onChange={(e) => { onSelect(e.target.value) }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 black w-full =-2.5"
            >
                {
                    options.map((option) => {
                        return <option value={option.key}>{option.value}</option>
                    })
                }
            </select>
        </>
    )
}