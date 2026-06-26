import type { ServiceDefinition } from "@/lib/generatePage";
import kosilkaTravy from "./kosilka";

/**
 * Единый реестр всех услуг платформы.
 * Добавьте новую услугу сюда — и она автоматически появится на всех городских страницах.
 */
export const services: ServiceDefinition[] = [
  kosilkaTravy,
  // uborkaSnegaService,
  // sadovnikService,
  // ...
];

/** Поиск услуги по slug */
export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.serviceSlug === slug);
}
