import { Card, CardContent, CardOwnProps } from "@mui/material";

export default function CustomCard({
  onClick,
  style,
  children,
}: {
  onClick: () => void;
  style?: CardOwnProps["sx"];
  children: React.ReactNode;
}) {
  return (
    <Card
      onClick={onClick}
      sx={{
        padding: 2,
        maxWidth: 345,
        height: 160,
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        transition: "transform 0.15s ease-in-out",
        ...style,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
