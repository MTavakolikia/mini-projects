import { Button, Group, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <VStack as="section" textAlign={"center"} py={6} w={"full"} gap={8}>
            <Heading>به مینی اپ خوش اومدی 👋</Heading>
            <Text >یک اپ چندکاره برای افزایش تمرکز، مدیریت کارها و بهره‌وری</Text>
            <Link to="/todo">
                برو به لیست کارها 🚀
            </Link>
            <Group attached w="full" maxW="sm">
                <Input flex="1" placeholder="Enter your email" />
                <Button bg="bg.subtle" variant="outline">
                    Submit
                </Button>
            </Group>
        </VStack>
    );
}
