import { Categories } from "@models/Category";
import { SecondaryMenuItem } from "@components/SecondaryMenu";

const secondaryMenuItems: SecondaryMenuItem[] = [
  { label: "Todos", path: "/", value: Categories.ALL },
  { label: "Línea blanca", path: "/?category=WHITE", value: Categories.WHITE },
  { label: "Línea marrón", path: "/?category=BROWN", value: Categories.BROWN },
  { label: "Línea gris", path: "/?category=GRAY", value: Categories.GRAY },
  {
    label: "Pequeños electrodomésticos",
    path: "/?category=SMALL_APPS",
    value: Categories.SMALL_APPS,
  },
];

export default secondaryMenuItems;
