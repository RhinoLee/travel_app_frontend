import { unref } from "vue"
export function useTimeTransfer({ startDate, endDate, nowTimeZone, timeZoneList }) {
  if (!startDate || !endDate) return
  const target = unref(timeZoneList).filter(timeZone => timeZone.name === unref(nowTimeZone))[0]
  if (!target) return
  const offset = target.utc_offset.hours || 0
  const localOffset = new Date(Date.now()).getTimezoneOffset() / 60 // 當地電腦時間與 UTC 的時差
  const newStartDate = new Date(startDate)
  const newEndDate = new Date(endDate)

  // 先補 localOffset，再加上選擇的時區
  newStartDate.setHours(newStartDate.getHours() + (-localOffset) + offset * 1)
  newEndDate.setHours(newEndDate.getHours() + (-localOffset) + offset * 1)
  return {
    startDateResult: newStartDate.toISOString(),
    endDateResult: newEndDate.toISOString()
  }
}