import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const ProfileUser = ({ profile }) => {
    console.log(profile);

    return (
        <div className="flex justify-center mt-10">
            <Card className="relative pt-16 max-w-sm w-full text-center">
                <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2">
                    <Avatar className="w-20 h-20">
                        <AvatarImage
                            src={profile?.name}
                            alt={profile?.name}
                            className="w-20 h-20"
                        />
                        <AvatarFallback className="w-20 h-20 text-xl">
                            {profile?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <CardContent className="mt-10">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <p className="font-semibold">Name</p>
                            <p>{profile?.name}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Email</p>
                            <p>{profile?.email}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Phone Number</p>
                            <p>{profile?.phone_number ?? "-"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileUser;
