import { Check, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Badge } from "./ui/badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface ComboIngridentInterface {
  label: string;
  value: string;
}

export function RecipeIngredientCombobox({
  ingredients,
  values,
  setValue
}: {
  ingredients: ComboIngridentInterface[];
  values: ComboIngridentInterface[]
  setValue: Dispatch<SetStateAction<ComboIngridentInterface[]>>
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className="w-[200px] flex justify-between border bg-input pl-2 pr-3 py-2 rounded-full dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
        >
          <ScrollArea className="w-[90%] rounded-full">
            <div className="w-full overflow-hidden flex-1 flex gap-1 justify-start items-center rounded-full">
              {values &&
                values.length > 0 &&
                values?.map((item) => (
                  <Badge key={item.value} variant="default">
                    {item.label}
                  </Badge>
                ))}
              <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>
          <Search className="opacity-50 h-5 w-5" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ingredient..." className="h-9" />
          <CommandList>
            <CommandEmpty>No ingredient found.</CommandEmpty>
            <CommandGroup>
              {ingredients.map((ingredient) => (
                <CommandItem
                  className="group"
                  key={ingredient.value}
                  value={ingredient.value}
                  onSelect={(currentValue) => {
                    console.log(currentValue)
                    const alreadyExist = values.find(val => val.value === currentValue)
                    if (!alreadyExist) {
                      setValue(prev => [...prev, { ...ingredient }])
                    } else {
                      setValue(prev => prev.filter(item => item.value !== currentValue))
                    }

                    setOpen(false);
                  }}
                >
                  {ingredient.label}
                  {values.find(item => item.value === ingredient.value) && (
                    <Check className={cn("ml-auto group:hover:bg-white")} />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
