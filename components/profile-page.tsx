'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfilePage() {
  const user = {
    name: "Atheer a Peter",
    email: "atheer07713991785@gmail.com",
    image: "https://lh3.googleusercontent.com/a/ACg8ocKKlBkXFEBXMtw1zg2_mMA-i7mnF6lR_HLa3fIlm2rKb6fx_M2X=s96-c"
  }
  const expires = "2024-11-06T11:36:27.950Z"

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Session expires: {new Date(expires).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}