import { Button } from "./button";

export const Appbar = ({
    user,
    Login,
    Logout
}: {
    user?: {},
    Login: () => void,
    Logout: () => void
}) => {
    return (
        <div className="flex justify-between border-b px-4">
            <div className="text-lg flex flex-col justify-center">
                Swifty
            </div>
            <div className="flex flex-col justify-center pt-2">
                <Button handleClick={user ? Logout : Login}>
                    {
                        user ? "Logout" : "Login"
                    }
                </Button>
            </div>
        </div>
    )
}
