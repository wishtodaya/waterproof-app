// pages/contact/index.tsx
import { useState, useCallback, useEffect } from 'react'
import { View } from "@tarojs/components"
import { useShareAppMessage, showToast, showLoading, hideLoading } from "@tarojs/taro"
import { AtLoadMore } from 'taro-ui'
import AboutUs from "../../components/about-us"
import BookingForm from "../../components/booking-form"
import { contactApi } from "../../services/contact/contact-api"
import { handleError } from "../../utils/error"
import type { AboutUsProps } from "../../components/about-us/types"
import type { ServiceTypeOption, BookingFormData } from "../../components/booking-form/types"
import "./index.scss"

interface PageState {
 submitting: boolean
 loading: boolean
 serviceTypes: ServiceTypeOption[]
 contactInfo: AboutUsProps | null
}

export default function ContactPage() {
 const [state, setState] = useState<PageState>({
   submitting: false,
   loading: true,
   serviceTypes: [],
   contactInfo: null
 })

 useShareAppMessage(() => ({
   title: "专业防水工程服务 - 免费上门勘测",
   path: "/pages/contact/index",
   imageUrl: "../../assets/share/contact.png",
 }))

 useEffect(() => {
   const initPage = async () => {
     showLoading({ title: '加载中...' })
     try {
       const [typesRes, infoRes] = await Promise.all([
         contactApi.getServiceTypes(),
         contactApi.getContactInfo()
       ])
       setState(prev => ({
         ...prev,
         serviceTypes: typesRes.data,
         contactInfo: infoRes.data,
         loading: false
       }))
     } catch (error) {
       showToast({ title: handleError(error), icon: 'none' })
     } finally {
       hideLoading()
     }
   }
   initPage()
 }, [])

 const handleSubmit = useCallback(async (data: BookingFormData) => {
   if(state.submitting) return
   
   try {
     setState(prev => ({ ...prev, submitting: true }))
     await contactApi.submitBooking(data)
     showToast({ 
       title: '预约成功,我们会尽快联系您',
       icon: 'success',
       duration: 2000
     })
   } catch (error) {
     showToast({ 
       title: handleError(error),
       icon: 'none',
       duration: 2000
     })
   } finally {
     setState(prev => ({ ...prev, submitting: false }))
   }
 }, [state.submitting])

 if (state.loading) {
   return (
     <View className="contact-page">
       <AtLoadMore status="loading" />
     </View>
   )
 }

 return (
   <View className="contact-page">
     <View className="contact-page__content">
       <View className="contact-page__section contact-page__section--booking">
         <View className="contact-page__section-header">
           <View className="contact-page__section-title">预约服务</View>
           <View className="contact-page__section-subtitle">填写信息免费上门勘测</View>
         </View>
         <BookingForm 
           loading={state.submitting}
           serviceTypes={state.serviceTypes} 
           onSubmit={handleSubmit}
         />
       </View>

       {state.contactInfo && (
         <View className="contact-page__section contact-page__section--about">
           <View className="contact-page__section-header">
             <View className="contact-page__section-title">关于我们</View>
             <View className="contact-page__section-subtitle">专业防水服务十年</View>
           </View>
           <AboutUs {...state.contactInfo} />
         </View>
       )}
     </View>
   </View>
 )
}