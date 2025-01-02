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
        <div className="flex justify-between border-b px-4  pl-20 pt-3 pb-3">
            <div className="font-bold text-2xl flex flex-col justify-center ">
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
