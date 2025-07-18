import { Button, Group, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-700">به مینی اپ خوش اومدی 👋</h2>
            <p className="text-gray-600">یک اپ چندکاره برای افزایش تمرکز، مدیریت کارها و بهره‌وری</p>
            <Link
                to="/todo"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
                برو به لیست کارها 🚀
            </Link>
            <Group attached w="full" maxW="sm">
                <Input flex="1" placeholder="Enter your email" />
                <Button bg="bg.subtle" variant="outline">
                    Submit
                </Button>
            </Group>
        </div>
    );
}
