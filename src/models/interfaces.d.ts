
declare namespace System {
	interface MarshalByRefObject {
	}
	interface Uri {
		absolutePath: string;
		absoluteUri: string;
		authority: string;
		dnsSafeHost: string;
		fragment: string;
		host: string;
		hostNameType: System.UriHostNameType;
		idnHost: string;
		isAbsoluteUri: boolean;
		isDefaultPort: boolean;
		isFile: boolean;
		isLoopback: boolean;
		isUnc: boolean;
		localPath: string;
		originalString: string;
		pathAndQuery: string;
		port: number;
		query: string;
		scheme: string;
		schemeDelimiter: string;
		segments: string[];
		uriSchemeFile: string;
		uriSchemeFtp: string;
		uriSchemeGopher: string;
		uriSchemeHttp: string;
		uriSchemeHttps: string;
		uriSchemeMailto: string;
		uriSchemeNetPipe: string;
		uriSchemeNetTcp: string;
		uriSchemeNews: string;
		uriSchemeNntp: string;
		userEscaped: boolean;
		userInfo: string;
	}
}
declare namespace System.Collections.Generic {
	interface KeyValuePair<TKey, TValue> {
		key: TKey;
		value: TValue;
	}
}
declare namespace System.Net {
	interface FtpWebResponse extends System.Net.WebResponse {
		bannerMessage: string;
		contentLength: number;
		exitMessage: string;
		headers: any;
		lastModified: Date;
		responseUri: System.Uri;
		statusCode: System.Net.FtpStatusCode;
		statusDescription: string;
		supportsHeaders: boolean;
		welcomeMessage: string;
	}
	interface WebResponse extends System.MarshalByRefObject {
		contentLength: number;
		contentType: string;
		headers: any;
		isFromCache: boolean;
		isMutuallyAuthenticated: boolean;
		responseUri: System.Uri;
		supportsHeaders: boolean;
	}
}
declare namespace VOO.Domain.Core.Hal {
	interface BaseResource {
		relations: System.Collections.Generic.KeyValuePair<string, VOO.Domain.Core.Hal.Link>[];
	}
	interface Link {
		href: string;
		hrefLang: string;
		isDeprecated: boolean;
		isTemplated: boolean;
		name: string;
		profile: string;
		title: string;
		type: string;
	}
}
declare namespace VOO.Domain.Core.Views.Catalog {
}
declare namespace VOO.Domain.Core.Views.Catalog.Config {
	interface OptionConfig {
		acbisActivateEcfInfo: string;
		acbisDeactivateEcfInfo: string;
		activationSource: VOO.Domain.Core.Views.Catalog.Config.ActivationSource;
		alwaysActive: boolean;
		bundles: VOO.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle[];
		canBeDeactivated: boolean;
		category: VOO.Domain.Core.Views.Catalog.ProductCategory;
		class: VOO.Domain.Core.Views.Catalog.Config.OptionClass;
		duration: boolean;
		equimpment: boolean;
		from: Date;
		group: VOO.Domain.Core.Views.Catalog.Config.OptionGroup;
		id: string;
		idForCatalogMatching: string;
		idForEligibility: string;
		includedInPackId: string;
		isObsolete: boolean;
		parametersForCatalog: string[];
		returnedBy: VOO.Domain.Core.Views.Catalog.Config.ReturnedByType;
		selfcareActivationDenied: boolean;
		to: Date;
		type: VOO.Domain.Core.Views.Catalog.Config.ProductType;
	}
}
declare namespace VOO.Domain.Core.Views.Catalog.Config.OptionConfig {
	interface Bundle {
		currentValue: number;
		description: string;
		hidden: boolean;
		id: number;
		name: string;
		type: VOO.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle.BundleType;
		unitComment: VOO.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle.BundleUnit;
		value: number;
	}
}
declare namespace VOO.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle {
}
declare namespace VOO.Domain.Core.Views.Catalog.DiscountInfo {
	interface OrderableDiscount {
		discount: number;
		relatedIds: string[];
		type: VOO.Domain.Core.Views.Catalog.DiscountInfo.OrderableDiscountType;
	}
}
declare namespace VOO.Domain.Core.Views.Customer.Eligibilty {
}
declare namespace VOO.Domain.Core.Views.Customer.Portfolio {
	interface ProductPresence {
		internet: boolean;
		telephone: boolean;
		television: boolean;
	}
}
declare namespace VOO.Domain.Views {
	interface ByteArrayResult {
		result: number[];
	}
	interface Identifier {
		system: string;
		value: any;
	}
}
declare namespace VOO.Domain.Views.Bank {
	interface BankAccount extends VOO.Domain.Core.Hal.BaseResource {
		accountNumber: string;
		bic: string;
		city: string;
		iban: string;
		name: string;
		sequence: number;
		street: string;
	}
	interface BankAccountCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Bank.BankAccount[];
	}
}
declare namespace VOO.Domain.Views.Billing {
	interface Account extends VOO.Domain.Core.Hal.BaseResource {
		deliveryType: VOO.Domain.Views.Billing.Account.invoiceDeliveryType;
		emailAddress: string;
		isEBillingEligible: boolean;
		isEligibleForFixDomiciliation: boolean;
		mobilePhoneNumber: string;
		smsNotifications: boolean;
	}
	interface Invoice extends VOO.Domain.Core.Hal.BaseResource {
		amount: number;
		documentReference: string;
		documentType: VOO.Domain.Views.Billing.BillingDocumentType;
		id: string;
		invoiceDate: Date;
		paymentDueDate: Date;
		paymentStatus: VOO.Domain.Views.Billing.PaymentStatusType;
		periodEndDate: Date;
		periodStartDate: Date;
		product: VOO.Domain.Views.Billing.ProductType;
	}
	interface InvoiceAddress {
		boxNumber: string;
		building: string;
		city: string;
		country: string;
		houseNumber: string;
		houseNumber2: string;
		isValid: boolean;
		originaStringAddress: string;
		originaStringAddressWithoutSeparators: string;
		poBox: string;
		postCode: string;
		street: string;
		street2: string;
		street3: string;
	}
	interface InvoiceCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Billing.Invoice[];
	}
	interface PaymentBalance extends VOO.Domain.Core.Hal.BaseResource {
		hasMobileAccountBalance: boolean;
		isAvailable: boolean;
		isOneBill: boolean;
		totalBalance: number;
		totalMobile: number;
		totalPack: number;
		totalTelevision: number;
		unPaidInvoices: number;
		unPaidMobileInvoices: number;
	}
	interface Receivable {
		amount: number;
		productType: VOO.Domain.Views.Billing.ProductType;
		structuredCommunication: string;
		unPaidInvoices: number;
	}
}
declare namespace VOO.Domain.Views.Billing.Account {
}
declare namespace VOO.Domain.Views.ContactForm {
	interface ContactFormMapping {
		motives: string[];
		reason: string;
	}
	interface ContactFormTypes extends VOO.Domain.Core.Hal.BaseResource {
		mappings: VOO.Domain.Views.ContactForm.ContactFormMapping[];
	}
}
declare namespace VOO.Domain.Views.ContactForm.Ftp {
	interface SendFtpFileResponse {
		fileName: string;
		ftpResponse: System.Net.FtpWebResponse;
	}
}
declare namespace VOO.Domain.Views.CreditCheck {
	interface CreditScore {
		fixProducts: VOO.Domain.Views.CreditCheck.CreditScoreValue;
		handsetScoreColor: VOO.Domain.Views.CreditCheck.CreditScoreColor;
		mobile: VOO.Domain.Views.CreditCheck.CreditScoreValue;
		mobileScoreColor: VOO.Domain.Views.CreditCheck.CreditScoreColor;
		mobileScoreLabel: string;
		refusalReason4P: VOO.Domain.Core.Views.Customer.Eligibilty.RefusalReason4P;
	}
	interface EligibilityAndCreditCheckDetail {
		handsetCreditScore: VOO.Domain.Views.CreditCheck.CreditScoreColor;
		mobileSubscriptionCreditScore: VOO.Domain.Views.CreditCheck.CreditScoreColor;
	}
	interface HandsetAndStarOfferResponse extends VOO.Domain.Core.Hal.BaseResource {
		isEligible: boolean;
	}
}
declare namespace VOO.Domain.Views.Cuca {
	interface Claim {
		type: string;
		value: string;
	}
	interface CucaProfile extends VOO.Domain.Core.Hal.BaseResource {
		email: string;
		impersonatedUser: VOO.Domain.Views.Cuca.ImpersonatedUser;
	}
	interface ImpersonatedUser {
		customerId: string;
		email: string;
	}
	interface UserAccount extends VOO.Domain.Core.Hal.BaseResource {
		accountDetails: VOO.Domain.Views.Cuca.UserAccountDetails;
		accountSummary: VOO.Domain.Views.Cuca.UserAccountSummary;
		customerId: string;
	}
	interface UserAccountDetails {
		city: string;
		firstname: string;
		lastname: string;
		mobile: string;
		phone: string;
		street: string;
		zipCode: string;
	}
	interface UserAccountSummary {
		email: string;
		login: string;
		status: VOO.Domain.Views.Cuca.UserAccountStatus;
	}
}
declare namespace VOO.Domain.Views.Customer {
	interface Address extends VOO.Domain.Core.Hal.BaseResource {
		addressType: VOO.Domain.Views.Customer.AddressType;
		boxNumber: string;
		city: string;
		cityIds: VOO.Domain.Views.Identifier[];
		countryCode: string;
		frequencyPlan: string;
		houseNumber: string;
		id: number;
		networkId: string;
		newConnectionRequired: boolean;
		packFriendlyName: string;
		packId: string;
		pointOfDelivery: string;
		productAvailability: VOO.Domain.Views.Customer.ProductAvailability;
		productPresence: VOO.Domain.Core.Views.Customer.Portfolio.ProductPresence;
		street: string;
		streetId: number;
		vooStreetId: number;
		zipCode: string;
	}
	interface AddressCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Customer.Address[];
	}
	interface Customer extends VOO.Domain.Core.Hal.BaseResource {
		addresses: VOO.Domain.Views.Customer.Address[];
		birthdate: Date;
		customerId: string;
		emailAddress: string;
		firstname: string;
		gsmNumber: string;
		invoiceDeliveryType: VOO.Domain.Views.Billing.Account.invoiceDeliveryType;
		isEligibleForEBilling: boolean;
		isEligibleForFixDomiciliation: boolean;
		isSMSNotificationRequired: boolean;
		language: string;
		lastname: string;
		login: string;
		telephoneNumber: string;
		title: string;
	}
	interface ProductAvailability {
		hdTelevision: boolean;
		idTelevision: boolean;
		internet: boolean;
		internetLevel: number;
		newConnexionRequired: boolean;
		telephone: boolean;
		television: boolean;
	}
	interface SimpleCustomer extends VOO.Domain.Core.Hal.BaseResource {
		birthdate: Date;
		customerId: string;
		emailAddress: string;
		firstname: string;
		gsmNumber: string;
		lastname: string;
		otherAddresses: VOO.Domain.Views.Customer.Address[];
		telephoneNumber: string;
		usageAddresses: VOO.Domain.Views.Customer.Address[];
	}
}
declare namespace VOO.Domain.Views.Document {
	interface Document extends VOO.Domain.Core.Hal.BaseResource {
		creationDate: Date;
		documentReference: string;
		documentType: VOO.Domain.Views.Document.DocumentType;
		productType: VOO.Domain.Views.Document.DocumentProductType;
	}
	interface DocumentCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Document.Document[];
	}
	interface DocumentLink extends VOO.Domain.Core.Hal.BaseResource {
		uri: System.Uri;
	}
}
declare namespace VOO.Domain.Views.EasySwitch {
	interface EasySwitchResource extends VOO.Domain.Core.Hal.BaseResource {
		easySwitchId: string;
	}
}
declare namespace VOO.Domain.Views.Email {
	interface Alias {
		login: string;
		sequence: number;
	}
	interface Mailbox {
		aliases: VOO.Domain.Views.Email.Alias[];
		canBeDeleted: boolean;
		domain: string;
		emailAddress: string;
		login: string;
		sequence: number;
	}
	interface MailboxAccount extends VOO.Domain.Core.Hal.BaseResource {
		allowedDomains: string[];
		mailboxes: VOO.Domain.Views.Email.Mailbox[];
		pointOfConsumptionId: string;
		sap14: string;
	}
	interface MailboxAccountCollection extends VOO.Domain.Core.Hal.BaseResource {
		mailboxAccounts: VOO.Domain.Views.Email.MailboxAccount[];
	}
}
declare namespace VOO.Domain.Views.Fake {
	interface FakeContractInfo extends VOO.Domain.Core.Hal.BaseResource {
		fakeContractId: string;
	}
}
declare namespace VOO.Domain.Views.Legacy {
	interface LegacyCreditScore {
		currentPerdiodBalance: number;
		status: VOO.Domain.Views.Legacy.CreditScoreStatus;
	}
	interface LegacyServicesInformation {
		status: VOO.Domain.Views.Legacy.LegacyServicesStatus;
	}
}
declare namespace VOO.Domain.Views.Mandate {
	interface Mandate extends VOO.Domain.Core.Hal.BaseResource {
		iban: string;
		isUsed: boolean;
		productType: VOO.Domain.Views.Mandate.MandateProductType;
		status: VOO.Domain.Views.Mandate.MandateStatus;
		userStatus: VOO.Domain.Views.Mandate.MandateUserStatus;
	}
	interface MandateCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Mandate.Mandate[];
	}
}
declare namespace VOO.Domain.Views.Network {
	interface NetworkOperator extends VOO.Domain.Core.Hal.BaseResource {
		cableOperatorName: string;
		label: string;
		legalOperatorName: string;
		operatorId: number;
		operatorName: string;
	}
	interface NetworkOperatorCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Network.NetworkOperator[];
	}
}
declare namespace VOO.Domain.Views.NextBestOffer {
	interface Offer {
		id: string;
		type: VOO.Domain.Views.NextBestOffer.OfferType;
	}
	interface OfferCollection extends VOO.Domain.Core.Hal.BaseResource {
		offers: VOO.Domain.Views.NextBestOffer.Offer[];
	}
}
declare namespace VOO.Domain.Views.Phone {
	interface Phone extends VOO.Domain.Core.Hal.BaseResource {
		acbisNumber: string;
		displayId: string;
		displayName: string;
		eqNo: number;
		esId: string;
		flagPortability: boolean;
		flagRestricted: boolean;
		flagSuspended: boolean;
		flagVInstall: boolean;
		periodEnd: string;
		periodStart: string;
		serviceId: string;
	}
	interface PhoneCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Phone.Phone[];
	}
}
declare namespace VOO.Domain.Views.Product {
	interface NetworkOperator {
		id: number;
		label: string;
		networkOperatorFullName: string;
		networkOperatorId: number;
		networkOperatorName: string;
	}
	interface OptionEligibility {
		eligible: boolean;
		option: VOO.Domain.Core.Views.Catalog.Config.OptionConfig;
	}
	interface OptionIdentifier {
		externalId: string;
		phoneNumber: string;
		pointOfDeliveryId: string;
		sap14: string;
		type: VOO.Domain.Core.Views.Catalog.Config.ProductType;
	}
	interface OptionPromo extends VOO.Domain.Core.Hal.BaseResource {
		amount: number;
		endDate: Date;
		id: string;
		label: string;
		movement: VOO.Domain.Views.Product.PromoMovementType;
	}
	interface OptionStatusResource extends VOO.Domain.Core.Hal.BaseResource {
		key: string;
		mobileCreditLimit: number;
		status: VOO.Domain.Views.Product.OptionStatus;
	}
	interface OptionViewCollectionResource extends VOO.Domain.Core.Hal.BaseResource {
		activationStatuses: VOO.Domain.Views.Product.Activation.ActivationStatusView[];
		options: VOO.Domain.Views.Product.OptionViewResource[];
	}
	interface OptionViewResource extends VOO.Domain.Core.Hal.BaseResource {
		activation: VOO.Domain.Views.Product.Activation.Activatability;
		category: VOO.Domain.Core.Views.Catalog.ProductCategory;
		creditLimit: number;
		discount: number;
		externalId: string;
		isIncludedInPack: boolean;
		key: string;
		onMostExpensive: VOO.Domain.Core.Views.Catalog.DiscountInfo.OrderableDiscount;
		phoneNumber: string;
		pointOfDeliveryId: string;
		price: number;
		priceWithoutDiscount: number;
		promos: VOO.Domain.Views.Product.OptionPromo[];
		sap14: string;
		simulated: boolean;
		simulationLocked: boolean;
		status: VOO.Domain.Views.Product.OptionStatus;
	}
	interface OrderOptionsViewCollectionResource extends VOO.Domain.Views.Product.OptionViewCollectionResource {
		basket: VOO.Domain.Views.Product.OptionViewResource[];
	}
}
declare namespace VOO.Domain.Views.Product.Activation {
	interface Activatability {
		exclusivities: string[];
		failure: boolean;
		migrations: string[];
		optionActivationAllowed: boolean;
		reason: VOO.Domain.Views.Product.Activation.ActivationReason;
		requirements: string[];
	}
	interface ActivationStatusView {
		acknowledgementId: string;
		externalId: string;
		phoneNumber: string;
		reason: string;
		sap14: string;
		status: VOO.Domain.Views.Product.Activation.ActivationExternalStatus;
	}
}
declare namespace VOO.Domain.Views.Product.Downgrades {
	interface DowngradableOptionResource extends VOO.Domain.Core.Hal.BaseResource {
		isDowngradable: boolean;
		isEligibleCustomer: boolean;
		optionId: string;
	}
	interface OptionProvisioningResource extends VOO.Domain.Core.Hal.BaseResource {
		status: string;
	}
	interface VisOptionValidityResource extends VOO.Domain.Core.Hal.BaseResource {
		status: string;
	}
}
declare namespace VOO.Domain.Views.Product.Mobile {
	interface BoostDataUsage {
		data: VOO.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface Company extends VOO.Domain.Views.Product.Mobile.Contractor {
		companyName: string;
		vatNumber: string;
	}
	interface Contractor {
		firstName: string;
		gender: VOO.Domain.Views.Product.Mobile.Contractor.GenderType;
		lastname: string;
		msisdn: string;
	}
	interface ContractStatus {
		status: VOO.Domain.Views.Product.Mobile.ContractStatus.ContractStatusType;
	}
	interface CreditLimit {
		amount: number;
		definedByCustomer: boolean;
	}
	interface DomainConstants {
		purchaseUrl: string;
	}
	interface EuropeUsage {
		sms: VOO.Domain.Views.Product.Mobile.UsageInfo;
		voice: VOO.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface HardwareInfo {
		durationInMonth: number;
		id: number;
		monthlyPrice: number;
		name: string;
		ongoing: boolean;
		paidMonths: number;
		remainingMonth: number;
		totalPrice: number;
		unpaidMonths: number;
		upfrontFee: number;
		validFrom: Date;
		validTill: Date;
	}
	interface Individual extends VOO.Domain.Views.Product.Mobile.Contractor {
	}
	interface MainUsage {
		data: VOO.Domain.Views.Product.Mobile.UsageInfo;
		sms: VOO.Domain.Views.Product.Mobile.UsageInfo;
		voice: VOO.Domain.Views.Product.Mobile.UsageInfo;
		voice2VooMobile: VOO.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface MobileCardHolder {
		firstname: string;
		lastname: string;
	}
	interface MobileInformation extends VOO.Domain.Core.Hal.BaseResource {
		contractor: VOO.Domain.Views.Product.Mobile.Contractor;
		subscriptions: VOO.Domain.Views.Product.Mobile.MobileSubscription[];
	}
	interface MobileOffer {
		dataOnly: boolean;
		hardware: VOO.Domain.Views.Product.Mobile.HardwareInfo;
		id: string;
		limit: VOO.Domain.Views.Product.Mobile.CreditLimit;
		name: string;
		price: number;
		promotion: VOO.Domain.Views.Product.Mobile.MobileOfferPromotion;
		services: VOO.Domain.Views.Product.Mobile.MobilePricedProduct[];
	}
	interface MobileOfferPromotion {
		amount: number;
		endDate: Date;
		id: number;
	}
	interface MobilePricedProduct {
		category: VOO.Domain.Core.Views.Catalog.ProductCategory;
		id: string;
		monthlyPrice: number;
		type: VOO.Domain.Views.Product.ServiceType;
	}
	interface MobileProductDetail {
		id: string;
		name: string;
	}
	interface MobileSubscription extends VOO.Domain.Core.Hal.BaseResource {
		balance: number;
		holder: VOO.Domain.Views.Product.Mobile.MobileCardHolder;
		id: string;
		msisdn: number;
		offer: VOO.Domain.Views.Product.Mobile.MobileOffer;
		simCard: VOO.Domain.Views.Product.Mobile.SimCard;
		usage: VOO.Domain.Views.Product.Mobile.MobileUsage;
		validTill: Date;
	}
	interface MobileUsage {
		boostData: VOO.Domain.Views.Product.Mobile.BoostDataUsage;
		europe: VOO.Domain.Views.Product.Mobile.EuropeUsage;
		main: VOO.Domain.Views.Product.Mobile.MainUsage;
		niceDevice: VOO.Domain.Views.Product.Mobile.NiceDeviceUsage;
		roaming: VOO.Domain.Views.Product.Mobile.RoamingUsage;
	}
	interface NiceDeviceUsage {
		data: VOO.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface RoamingUsage {
		money: VOO.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface SimCard {
		iccid: string;
		indicator: VOO.Domain.Views.Product.Mobile.SimCardIndicator;
		name: string;
		puk: string;
		status: VOO.Domain.Views.Product.Mobile.SimCardStatus;
	}
	interface TariffPlanView extends VOO.Domain.Core.Hal.BaseResource {
		id: number;
		key: string;
	}
	interface UsageInfo {
		current: number;
		limit: number;
		unit: VOO.Domain.Views.Product.Mobile.UsageUnit;
		unlimited: boolean;
	}
}
declare namespace VOO.Domain.Views.Product.Mobile.Contractor {
}
declare namespace VOO.Domain.Views.Product.Mobile.ContractStatus {
}
// declare namespace VOO.Domain.Views.Product.Mobile.MobileOffer {
// 	interface <>c__DisplayClass34_0 {
// 		currentPlan: VOO.Domain.Core.Views.Catalog.TariffPlan;
// 		otherPlan: VOO.Domain.Core.Views.Catalog.TariffPlan;
// 	}
// }
// declare namespace VOO.Domain.Views.Product.OrderOptionsViewCollectionResource {
// 	interface <>c {
// 		<>9: VOO.Domain.Views.Product.OrderOptionsViewCollectionResource.<>c;
// 		<>910: any;
// 	}
// }
declare namespace VOO.Domain.Views.Smartphone {
	interface Smartphone {
		brand: string;
		bundlePrice: number;
		cashbackDescr: System.Collections.Generic.KeyValuePair<string, string>[];
		cashbackEnd: string;
		cashbackStart: string;
		cashbackUrl: string;
		color: string;
		contractDuration: number;
		frontCamera: string;
		image: string;
		inStock: boolean;
		internalStorage: number;
		isStar: boolean;
		model: string;
		name: string;
		operatingSystem: string;
		operatingSystemVersion: string;
		optionSmartphonePrice: number;
		price: number;
		rearCamera: string;
		screenSize: number;
		simType: string;
		sku: string;
		url: System.Collections.Generic.KeyValuePair<string, string>[];
	}
}
declare namespace VOO.Domain.Views.TvParameters {
	interface TvParameters extends VOO.Domain.Core.Hal.BaseResource {
		parentalControlMinAgeRating: string;
		parentalControlPinCode: string;
		vodPurchaseCode: string;
	}
}
declare namespace VOO.Domain.Views.Usage.Average {
	interface UsageAverage extends VOO.Domain.Core.Hal.BaseResource {
		usage: any;
	}
}
declare namespace VOO.Domain.Views.Usage.Mobile {
	interface CallDetailRecord {
		cost: number;
		national: boolean;
		offPlan: boolean;
		phoneNumber: string;
		time: Date;
		type: VOO.Domain.Views.Usage.Mobile.MobileDailyUsageType;
		unit: VOO.Domain.Views.Usage.Mobile.UsageUnit;
		usage: number;
	}
	interface CallDetailRecordsHistory {
		items: VOO.Domain.Views.Usage.Mobile.MobileDailyUsage[];
		summary: VOO.Domain.Views.Usage.Mobile.UsageSummary;
		totalCount: number;
	}
	interface MobileDailyUsage {
		cost: number;
		date: Date;
		records: VOO.Domain.Views.Usage.Mobile.CallDetailRecord[];
	}
	interface OutOfBundleUsage {
		cost: number;
		usage: number;
	}
	interface UsageSummary {
		details: VOO.Domain.Views.Usage.Mobile.UsageSummary[];
		name: VOO.Domain.Views.Usage.Mobile.OutOfBundleCategory;
		outOfBundleUsage: VOO.Domain.Views.Usage.Mobile.OutOfBundleUsage;
	}
}
declare namespace VOO.Domain.Views.Usage.Net {
	interface NetDailyUsage extends VOO.Domain.Views.Usage.Net.NetUsageUnit {
		day: number;
		month: number;
		usageDay: Date;
		year: number;
	}
	interface NetMonthlyUsage extends VOO.Domain.Views.Usage.Net.NetUsageUnit {
		connectionId: string;
		dailyUsages: VOO.Domain.Views.Usage.Net.NetDailyUsage[];
		dailyUsageUnit: VOO.Domain.Views.Usage.Net.NetUsageUnit.UnitType;
		overPriceDownloadAsEuro: number;
		overPriceUploadAsEuro: number;
		overQuotaDownloadAsBytes: number;
		overQuotaUploadAsBytes: number;
		period: Date;
		periodStartDate: string;
		quotaAsBytes: number;
		totalOverPriceAsEuro: number;
		totalOverQuotaAsBytes: number;
	}
	interface NetMonthlyUsageCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Usage.Net.NetMonthlyUsage[];
	}
	interface NetUsageUnit extends VOO.Domain.Core.Hal.BaseResource {
		downloadVolumeAsBytes: number;
		totalVolumeAsBytes: number;
		totalVolumeAsUnit: number;
		uploadVolumeAsBytes: number;
		usageUnit: VOO.Domain.Views.Usage.Net.NetUsageUnit.UnitType;
		volumeMultiplicator: number;
	}
	interface NetYearlyUsage extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Usage.Net.NetMonthlyUsage[];
		monthlyUsageUnit: VOO.Domain.Views.Usage.Net.NetUsageUnit.UnitType;
	}
}
declare namespace VOO.Domain.Views.Usage.Net.NetUsageUnit {
}
// declare namespace VOO.Domain.Views.Usage.Net.NetYearlyUsage {
// 	interface <>c {
// 		<>9: VOO.Domain.Views.Usage.Net.NetYearlyUsage.<>c;
// 		<>940: any;
// 		<>941: any;
// 	}
// }
declare namespace VOO.Domain.Views.Usage.Phone {
	interface PhoneDailyUsage extends VOO.Domain.Core.Hal.BaseResource {
		callDeviceType: VOO.Domain.Views.Usage.Phone.PhoneDailyUsage.DeviceType;
		callLocalisation: VOO.Domain.Views.Usage.Phone.PhoneDailyUsage.Localisation;
		crCallBegin: Date;
		crDest: string;
		crDuration: number;
		crDurationS: string;
		crPeakOffpeak: string;
		crPrice: number;
		crPriceTVAC: number;
		isIncluded: boolean;
		iso3166a3: string;
		rdDescription: string;
		rdId: number;
		rgCode: string;
		rgDesc: string;
		rpCode: string;
		tbcCode: string;
	}
	interface PhoneDailyUsageCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Usage.Phone.PhoneDailyUsage[];
		options: VOO.Domain.Core.Views.Catalog.Config.OptionConfig[];
		outOfBundlePrice: number;
		outOfBundlePriceTVAC: number;
		totalVoiceCommunication: number;
	}
}
declare namespace VOO.Domain.Views.Usage.Phone.PhoneDailyUsage {
}
// declare namespace VOO.Domain.Views.Usage.Phone.PhoneDailyUsageCollection {
// 	interface <>c__DisplayClass22_0 {
// 		optionId: string;
// 	}
// }
declare namespace VOO.Domain.Views.Usage.Vod {
	interface VodDailyUsage extends VOO.Domain.Core.Hal.BaseResource {
		creationDateTime: Date;
		name: string;
		priceCurrency: string;
		priceHT: number;
		priceTTC: number;
		productType: string;
	}
	interface VodMonthlyUsage extends VOO.Domain.Core.Hal.BaseResource {
		connectionId: string;
		count: number;
		dailyUsages: VOO.Domain.Views.Usage.Vod.VodDailyUsage[];
		period: Date;
		periodStartDate: string;
		totalExvat: number;
		totalInvat: number;
	}
	interface VodMonthlyUsageCollection extends VOO.Domain.Core.Hal.BaseResource {
		items: VOO.Domain.Views.Usage.Vod.VodMonthlyUsage[];
	}
}
