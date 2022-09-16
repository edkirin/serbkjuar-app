import { Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function AppHeader() {
    return (
        <>
            <Container maxWidth={false} className="app-header">
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <img src="/img/head-logo.png" className="logo" alt="serbkjuar" />
                    <Typography component="h1">serbkjuar</Typography>
                </Stack>
            </Container>
        </>
    );
}
