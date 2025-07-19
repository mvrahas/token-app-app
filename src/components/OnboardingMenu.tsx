import OnboardingMenuItem from './OnboardingMenuItem'

const OnboardingMenu = ()=>{
    return(
        <div className="flex flex-col items-center">
            <div className="flex flex-col w-full max-w-2xl items-center mt-4">
                <h2 className="text-lg font-medium">Let's get started!</h2>
                <span>Start accepting payments with the options below</span>
                <div className="w-full mt-6">
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <OnboardingMenuItem 
                            image={'/onboarding/woocommerce.svg'}
                            title={'Install the plugin'}
                            body={'Download the WooCommerce plugin to accept payments on your e-commerce store.'}
                            link={'https://wordpress.com/plugins/crypto-checkout-payment-gateway'}
                        />
                        <OnboardingMenuItem 
                            image={'/onboarding/api.svg'}
                            title={'Integrate the API'}
                            body={'Well documented endpoints and webhooks to create any payment flow.'}
                            link={'https://docs.numin.xyz'}
                        />
                        <OnboardingMenuItem 
                            image={'/onboarding/link.svg'}
                            title={'Create payment links'}
                            body={'Create links that your customers can use to complete payments in just a few clicks.'}
                            link={'/receive'}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OnboardingMenu