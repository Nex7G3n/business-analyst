import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Search = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Busqueda" />
      <Button type="submit">Buscar</Button>
    </div>
  )
}
