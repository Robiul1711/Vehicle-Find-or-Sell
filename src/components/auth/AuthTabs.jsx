import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CustomEmail } from "@/utils/IconProvider"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import logo from '../../assets/images/logo.png';
import { Link } from "react-router-dom"
export default function AuthTabs() {
    return (
        <div className="flex flex-col min-h-full">
                  <Link to="/" className="flex items-center justify-center">
                <img src={logo} alt="" className="w-20 h-20" />
            </Link>
            {/* Header Section */}
            <div className="text-center mb-6 py-10">
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-sm lg:text-xl text-muted-foreground">
                    Log in to buy, sell, and manage your vehicle listings in one place.
                </p>
            </div>

            <Tabs defaultValue="signin" className="w-full flex-1 flex flex-col">
                {/* Tab Header */}
                <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted p-1">
                    <TabsTrigger value="signin" className="p-2 text-sm lg:text-lg">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="p-2 text-sm lg:text-lg">Sign Up</TabsTrigger>
                </TabsList>

                {/* Tab Content Container */}
                <div className="flex-1 flex items-center justify-center min-h-0">

                    {/* Sign In Form */}
                    <TabsContent value="signin" className="mt-6 w-full flex-1 flex items-center">
                        <div className="w-full">
                            <LoginForm />
                        </div>
                    </TabsContent>

                    {/* Sign Up Form */}
                    <TabsContent value="signup" className="mt-6 w-full flex-1 flex items-center">
                        <div className="w-full">
                            <RegisterForm />
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}