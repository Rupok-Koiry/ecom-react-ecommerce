import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

export const fetchAnalyticsData = async () => {
  const response = await handleApiRequest(api.get("/analytics/model-counts"));
  return response.data;
};

export const fetchOrderMetrics = async () => {
  const response = await handleApiRequest(api.get("/analytics/order-metrics"));
  return response.data;
};

export const fetchPaymentMetrics = async () => {
  const response = await handleApiRequest(
    api.get("/analytics/payment-metrics")
  );
  return response.data;
};
