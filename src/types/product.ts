export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ProductState {
  loading: boolean;
  error: string;
  products: Product[];
}

export interface DrawerProps {
  open: boolean;
  toggleDrawer: any;
  values: any;
  setValues: any;
  setOpen: any;
  errors: any;
  setErrors: any;
}
