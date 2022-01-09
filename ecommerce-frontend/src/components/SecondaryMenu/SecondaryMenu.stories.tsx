import SecondaryMenu from "./SecondaryMenu";

export default {
  title: "SecondaryMenu",
  component: SecondaryMenu,
  argTypes: {
    items: {
      defaultValue: [
        { label: "Todos", path: "/" },
        { label: "Línea blanca", path: "/?category=WHITE" },
        { label: "Línea marrón", path: "/?category=BROWN" },
        { label: "Línea gris", path: "/?category=GRAY" },
        { label: "Pequeños electrodomésticos", path: "/?category=SMALL_APPS" },
      ],
    },
  },
};

export const Default = (args: any) => <SecondaryMenu {...args} />;
