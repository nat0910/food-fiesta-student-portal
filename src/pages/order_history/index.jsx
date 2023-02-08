import { useOrder } from "../../context/OrderContext";
import OrderHistoryCard from "../../components/order_history_page_component/order_history_card";
import OrderEmptyScreen from "../../components/order_history_page_component/order_history_empty_screen";

export default function OrderHistory() {
  const { orderHistoryData } = useOrder();

  return orderHistoryData.length === 0 ? (
    <OrderEmptyScreen />
  ) : (
    <div
      style={{
        marginTop: ".75rem",
      }}
    >
      <ul>
        {orderHistoryData.map((doc, index) => {
          return <OrderHistoryCard key={index} data={doc} />;
        })}
      </ul>
    </div>
  );
}
