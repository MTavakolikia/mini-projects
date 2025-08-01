import { Box, Progress, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface Props {
    completed: number;
    total: number;
}

export const TaskProgress = ({ completed, total }: Props) => {
    const { t } = useTranslation();
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <Box mt={4}>
            <Text >
                ✅ {t("todo.progress.completedOfTotal", { completed, total })}
            </Text>
            <Progress.Root maxW="240px" striped animated value={percent} variant={"outline"} colorPalette={"cyan"}>
                <Progress.Track>
                    <Progress.Range />
                </Progress.Track>
            </Progress.Root>
            <Text fontSize={"sm"}>
                {t("todo.progress.percent", { percent })}
            </Text>

        </Box>
    );
};
