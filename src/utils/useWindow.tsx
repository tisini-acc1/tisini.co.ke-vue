import { ref } from "vue";
export default function useWindow() {
  type Devices = "mobile" | "tablet" | "desktop";
  // if (process.client) {
  type WindowSize = {
    width: number;
    height: number;
    device: Devices;
  };
  const getDevice = (width: number): Devices => {
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  };
  const width = ref(window.innerWidth);

  const size = ref<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    device: getDevice(window.innerWidth),
  });
  // const isMobile = computed(() => size.value.device === "mobile");
  // const isTablet = computed(() => size.value.device === "tablet");
  // const isDesktop = computed(() => size.value.device === "desktop");
  window.addEventListener("resize", () => {
    size.value = {
      width: window.innerWidth,
      height: window.innerHeight,
      device: getDevice(window.innerWidth),
    };
  });
  return size;
  // }
}
