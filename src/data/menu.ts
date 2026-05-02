import coconutImg from "@/assets/menu-coconut-latte.png";
import grapeImg from "@/assets/menu-grape-boba.png";
import mangoImg from "@/assets/menu-mango.png";
import latteImg from "@/assets/menu-latte.png";
import brownImg from "@/assets/menu-brownsugar.png";
import strawImg from "@/assets/menu-strawmatcha.png";
import jasmineImg from "@/assets/menu-jasmine.png";
import espressoImg from "@/assets/menu-espresso.png";
import americanoImg from "@/assets/menu-americano.png";
import cappuccinoImg from "@/assets/menu-cappuccino.png";
import flatwhiteImg from "@/assets/menu-flatwhite.png";
import mochaImg from "@/assets/menu-mocha.png";
import cortadoImg from "@/assets/menu-cortado.png";
import icedMochaImg from "@/assets/menu-iced-mocha.png";
import caramelMacImg from "@/assets/menu-caramel-macchiato.png";

export type MenuItem = {
  id: string;
  name: string;
  zh: string;
  category: "Coffee" | "Boba" | "Tea";
  price: string;
  notes: string;
  image: string;
};

export const menuItems: MenuItem[] = [
  // Classic coffee
  { id: "espresso", name: "Espresso", zh: "意式浓缩", category: "Coffee", price: "£2.40", notes: "Single shot, slow extraction", image: espressoImg },
  { id: "americano", name: "Americano", zh: "美式咖啡", category: "Coffee", price: "£2.80", notes: "Double espresso, hot water", image: americanoImg },
  { id: "cortado", name: "Cortado", zh: "可塔朵", category: "Coffee", price: "£3.00", notes: "Equal espresso & steamed milk", image: cortadoImg },
  { id: "flat-white", name: "Flat White", zh: "馥芮白", category: "Coffee", price: "£3.20", notes: "Velvety microfoam, double ristretto", image: flatwhiteImg },
  { id: "cappuccino", name: "Cappuccino", zh: "卡布奇诺", category: "Coffee", price: "£3.20", notes: "Espresso, foam, dust of cocoa", image: cappuccinoImg },
  { id: "latte", name: "House Latte", zh: "招牌拿铁", category: "Coffee", price: "£3.40", notes: "Single origin, micro-foamed milk", image: latteImg },
  { id: "mocha", name: "Mocha", zh: "摩卡", category: "Coffee", price: "£3.80", notes: "Espresso, dark chocolate, cream", image: mochaImg },
  { id: "coconut-latte", name: "Coconut Iced Latte", zh: "生椰拿铁", category: "Coffee", price: "£4.20", notes: "Espresso, fresh coconut milk, soft ice", image: coconutImg },
  { id: "iced-mocha", name: "Iced Mocha", zh: "冰摩卡", category: "Coffee", price: "£4.20", notes: "Cold milk, espresso, dark cocoa", image: icedMochaImg },
  { id: "caramel-macchiato", name: "Iced Caramel Macchiato", zh: "焦糖玛奇朵", category: "Coffee", price: "£4.40", notes: "Layered milk, espresso, salted caramel", image: caramelMacImg },

  // Boba
  { id: "brown-sugar", name: "Brown Sugar Boba", zh: "黑糖珍珠", category: "Boba", price: "£4.80", notes: "Caramelised brown sugar, hand-cooked pearls", image: brownImg },
  { id: "grape", name: "Green Grape Cooler", zh: "多肉青提", category: "Boba", price: "£5.20", notes: "Whole green grapes, jasmine ice", image: grapeImg },
  { id: "mango", name: "Mango Coconut Tea", zh: "生椰芒芒", category: "Boba", price: "£5.00", notes: "Fresh mango, coconut milk, pearls", image: mangoImg },

  // Tea
  { id: "matcha", name: "Strawberry Matcha", zh: "草莓抹茶", category: "Tea", price: "£4.60", notes: "Ceremonial matcha, strawberry purée", image: strawImg },
  { id: "jasmine", name: "Iced Jasmine", zh: "茉莉花茶", category: "Tea", price: "£3.20", notes: "Loose-leaf jasmine, gently sweetened", image: jasmineImg },
];
