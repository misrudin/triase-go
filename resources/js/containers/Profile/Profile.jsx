import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const ProfileUser = () => {
    return (
        <div className="flex justify-start mt-10">
            <Card className="relative pt-16 max-w-sm w-full text-center">
                <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2">
                    <Avatar className="w-20 h-20">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            className="w-20 h-20"
                        />
                        <AvatarFallback className="w-20 h-20 text-xl">
                            CN
                        </AvatarFallback>
                    </Avatar>
                </div>
                <CardContent className="mt-10">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <p className="font-semibold">Name</p>
                            <p>Taufik Hdyt</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Email</p>
                            <p>taufik@example.com</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Phone Number</p>
                            <p>083871281239</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileUser;
