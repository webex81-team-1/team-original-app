import Login from "./login";

export const meta = () => {
  return [
    { title: "本棚" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Login></Login>
    </div>
  );
}
