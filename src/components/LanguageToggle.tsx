import type { Locale } from "@/@types/Locale";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "@/i18n/utils";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

export function LanguageToggle({ lang }: { lang: Locale }) {
  const [value, setValue] = useState<Locale>(lang);
  const t = useTranslations(lang);

  useEffect(() => {
    if (value !== lang) {
      const newPath = `/${value}`;
      window.location.href = newPath;
    }
  }, [value]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("languages")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => setValue(value as Locale)}
        >
          <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pt">Portugués</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
