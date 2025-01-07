import BalanceFinanciero from "@/components/Balance"
import Actions from "../components/Actions"
import News from "../components/News"
import CompanyDetails from "@/components/General"

export const EnterprisePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <CompanyDetails />
      <Actions />
      <BalanceFinanciero />
      <News />
    </div>
  )
}
