import BalanceFinanciero from "@/components/Balance"
import Actions from "../components/Actions"
import News from "../components/News"
import CompanyDetails from "@/components/General"

export const EnterprisePage = () => {
  return (
    <div>
      <CompanyDetails />
      <Actions />
      <BalanceFinanciero />
      <News />
    </div>
  )
}
