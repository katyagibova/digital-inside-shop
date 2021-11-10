const serverIP = "https://still-sierra-65239.herokuapp.com";

function addIP(url) {
  return `${serverIP}${url}`;
}

export const AUTHORIZE = addIP("/auth/jwt/create/");
export const REGISTRATION = addIP("/auth/users/");
export const GET_ALL_CARDS = addIP("/api/main/");
export const GET_BOUGHT_PRODUCTS = addIP("/api/bought_products/");
export const CREATE_PRODUCT = addIP("/api/main/");
export const GET_PRODUCT = addIP("/api/main/");
export const DELETE_PRODUCT = addIP("/api/main/");
export const UPDATE_PRODUCT = addIP("/api/main/");
export const BUY_PRODUCT = addIP("/api/main/");
export const GET_ROLE = addIP("/auth/users/me/");

export const GET_DISPLAY = addIP("/api/main/display/");

export const GET_ACCESSORIES_BRAND = addIP("/api/main/accessories_brand/");
export const GET_ACCESSORIES_TYPE = addIP("/api/main/accessories_type/");

export const GET_CAMERA_BRAND = addIP("/api/main/camera_brand/");
export const GET_CAMERA_MATRIX = addIP("/api/main/matrix/");

export const GET_TV_BRAND = addIP("/api/main/tv_brand/");
export const GET_TV_CONNECTION = addIP("/api/main/tv_connection/");

export const GET_PHONE_GPU = addIP("/api/main/phone_gpu/");
export const GET_PHONE_RAM = addIP("/api/main/phone_ram/");
export const GET_PHONE_ROM = addIP("/api/main/phone_rom/");
export const GET_PHONE_OS = addIP("/api/main/phone_os/");
export const GET_PHONE_PROCESSOR = addIP("/api/main/phone_processor/");
export const GET_PHONE_BRAND = addIP("/api/main/phone_brand/");

export const GET_PC_BRAND = addIP("/api/main/pc_brand/");
export const GET_PC_GPU = addIP("/api/main/pc_gpu/");
export const GET_PC_RAM = addIP("/api/main/pc_ram/");
export const GET_PC_ROM = addIP("/api/main/pc_rom/");
export const GET_PC_OS = addIP("/api/main/pc_os/");
export const GET_PC_PROCESSOR = addIP("/api/main/pc_processor/");
export const GET_PC_TYPE = addIP("/api/main/pc_type/");
