"use client";

import { UserType } from "@/lib/dal/user";
import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";

export default function Contenido({user} : { user: UserType | null}) {
    console.log(user);

    return (

        <>
            <form>

                <input type="date" />
            </form>

           <Button
        color="danger"
        variant="shadow"
        onPress={() => signOut()}
        className="font-semibold"
      >
        Logout
      </Button>
        </>
     
    )
};
