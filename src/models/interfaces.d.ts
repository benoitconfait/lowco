
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
declare namespace Lowco.Domain.Core.Hal {
	interface BaseResource {
		relations: System.Collections.Generic.KeyValuePair<string, Lowco.Domain.Core.Hal.Link>[];
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
declare namespace Lowco.Domain.Core.Views.Catalog {
}
declare namespace Lowco.Domain.Core.Views.Catalog.Config {
	interface OptionConfig {
		acbisActivateEcfInfo: string;
		acbisDeactivateEcfInfo: string;
		activationSource: Lowco.Domain.Core.Views.Catalog.Config.ActivationSource;
		alwaysActive: boolean;
		bundles: Lowco.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle[];
		canBeDeactivated: boolean;
		category: Lowco.Domain.Core.Views.Catalog.ProductCategory;
		class: Lowco.Domain.Core.Views.Catalog.Config.OptionClass;
		duration: boolean;
		equimpment: boolean;
		from: Date;
		group: Lowco.Domain.Core.Views.Catalog.Config.OptionGroup;
		id: string;
		idForCatalogMatching: string;
		idForEligibility: string;
		includedInPackId: string;
		isObsolete: boolean;
		parametersForCatalog: string[];
		returnedBy: Lowco.Domain.Core.Views.Catalog.Config.ReturnedByType;
		selfcareActivationDenied: boolean;
		to: Date;
		type: Lowco.Domain.Core.Views.Catalog.Config.ProductType;
	}
}
declare namespace Lowco.Domain.Core.Views.Catalog.Config.OptionConfig {
	interface Bundle {
		currentValue: number;
		description: string;
		hidden: boolean;
		id: number;
		name: string;
		type: Lowco.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle.BundleType;
		unitComment: Lowco.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle.BundleUnit;
		value: number;
	}
}
declare namespace Lowco.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle {
}
declare namespace Lowco.Domain.Core.Views.Catalog.DiscountInfo {
	interface OrderableDiscount {
		discount: number;
		relatedIds: string[];
		type: Lowco.Domain.Core.Views.Catalog.DiscountInfo.OrderableDiscountType;
	}
}
declare namespace Lowco.Domain.Core.Views.Customer.Eligibilty {
}
declare namespace Lowco.Domain.Core.Views.Customer.Portfolio {
	interface ProductPresence {
		internet: boolean;
		telephone: boolean;
		television: boolean;
	}
}
declare namespace Lowco.Domain.Views {
	interface ByteArrayResult {
		result: number[];
	}
	interface Identifier {
		system: string;
		value: any;
	}
}
declare namespace Lowco.Domain.Views.Bank {
	interface BankAccount extends Lowco.Domain.Core.Hal.BaseResource {
		accountNumber: string;
		bic: string;
		city: string;
		iban: string;
		name: string;
		sequence: number;
		street: string;
	}
	interface BankAccountCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Bank.BankAccount[];
	}
}
declare namespace Lowco.Domain.Views.Billing {
	interface Account extends Lowco.Domain.Core.Hal.BaseResource {
		deliveryType: Lowco.Domain.Views.Billing.Account.invoiceDeliveryType;
		emailAddress: string;
		isEBillingEligible: boolean;
		isEligibleForFixDomiciliation: boolean;
		mobilePhoneNumber: string;
		smsNotifications: boolean;
	}
	interface Invoice extends Lowco.Domain.Core.Hal.BaseResource {
		amount: number;
		documentReference: string;
		documentType: Lowco.Domain.Views.Billing.BillingDocumentType;
		id: string;
		invoiceDate: Date;
		paymentDueDate: Date;
		paymentStatus: Lowco.Domain.Views.Billing.PaymentStatusType;
		periodEndDate: Date;
		periodStartDate: Date;
		product: Lowco.Domain.Views.Billing.ProductType;
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
	interface InvoiceCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Billing.Invoice[];
	}
	interface PaymentBalance extends Lowco.Domain.Core.Hal.BaseResource {
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
		productType: Lowco.Domain.Views.Billing.ProductType;
		structuredCommunication: string;
		unPaidInvoices: number;
	}
}
declare namespace Lowco.Domain.Views.Billing.Account {
}
declare namespace Lowco.Domain.Views.ContactForm {
	interface ContactFormMapping {
		motives: string[];
		reason: string;
	}
	interface ContactFormTypes extends Lowco.Domain.Core.Hal.BaseResource {
		mappings: Lowco.Domain.Views.ContactForm.ContactFormMapping[];
	}
}
declare namespace Lowco.Domain.Views.ContactForm.Ftp {
	interface SendFtpFileResponse {
		fileName: string;
		ftpResponse: System.Net.FtpWebResponse;
	}
}
declare namespace Lowco.Domain.Views.CreditCheck {
	interface CreditScore {
		fixProducts: Lowco.Domain.Views.CreditCheck.CreditScoreValue;
		handsetScoreColor: Lowco.Domain.Views.CreditCheck.CreditScoreColor;
		mobile: Lowco.Domain.Views.CreditCheck.CreditScoreValue;
		mobileScoreColor: Lowco.Domain.Views.CreditCheck.CreditScoreColor;
		mobileScoreLabel: string;
		refusalReason4P: Lowco.Domain.Core.Views.Customer.Eligibilty.RefusalReason4P;
	}
	interface EligibilityAndCreditCheckDetail {
		handsetCreditScore: Lowco.Domain.Views.CreditCheck.CreditScoreColor;
		mobileSubscriptionCreditScore: Lowco.Domain.Views.CreditCheck.CreditScoreColor;
	}
	interface HandsetAndStarOfferResponse extends Lowco.Domain.Core.Hal.BaseResource {
		isEligible: boolean;
	}
}
declare namespace Lowco.Domain.Views.Cuca {
	interface Claim {
		type: string;
		value: string;
	}
	interface CucaProfile extends Lowco.Domain.Core.Hal.BaseResource {
		email: string;
		impersonatedUser: Lowco.Domain.Views.Cuca.ImpersonatedUser;
	}
	interface ImpersonatedUser {
		customerId: string;
		email: string;
	}
	interface UserAccount extends Lowco.Domain.Core.Hal.BaseResource {
		accountDetails: Lowco.Domain.Views.Cuca.UserAccountDetails;
		accountSummary: Lowco.Domain.Views.Cuca.UserAccountSummary;
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
		status: Lowco.Domain.Views.Cuca.UserAccountStatus;
	}
}
declare namespace Lowco.Domain.Views.Customer {
	interface Address extends Lowco.Domain.Core.Hal.BaseResource {
		addressType: Lowco.Domain.Views.Customer.AddressType;
		boxNumber: string;
		city: string;
		cityIds: Lowco.Domain.Views.Identifier[];
		countryCode: string;
		frequencyPlan: string;
		houseNumber: string;
		id: number;
		networkId: string;
		newConnectionRequired: boolean;
		packFriendlyName: string;
		packId: string;
		pointOfDelivery: string;
		productAvailability: Lowco.Domain.Views.Customer.ProductAvailability;
		productPresence: Lowco.Domain.Core.Views.Customer.Portfolio.ProductPresence;
		street: string;
		streetId: number;
		vooStreetId: number;
		zipCode: string;
	}
	interface AddressCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Customer.Address[];
	}
	interface Customer extends Lowco.Domain.Core.Hal.BaseResource {
		addresses: Lowco.Domain.Views.Customer.Address[];
		birthdate: Date;
		customerId: string;
		emailAddress: string;
		firstname: string;
		gsmNumber: string;
		invoiceDeliveryType: Lowco.Domain.Views.Billing.Account.invoiceDeliveryType;
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
	interface SimpleCustomer extends Lowco.Domain.Core.Hal.BaseResource {
		birthdate: Date;
		customerId: string;
		emailAddress: string;
		firstname: string;
		gsmNumber: string;
		lastname: string;
		otherAddresses: Lowco.Domain.Views.Customer.Address[];
		telephoneNumber: string;
		usageAddresses: Lowco.Domain.Views.Customer.Address[];
	}
}
declare namespace Lowco.Domain.Views.Document {
	interface Document extends Lowco.Domain.Core.Hal.BaseResource {
		creationDate: Date;
		documentReference: string;
		documentType: Lowco.Domain.Views.Document.DocumentType;
		productType: Lowco.Domain.Views.Document.DocumentProductType;
	}
	interface DocumentCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Document.Document[];
	}
	interface DocumentLink extends Lowco.Domain.Core.Hal.BaseResource {
		uri: System.Uri;
	}
}
declare namespace Lowco.Domain.Views.EasySwitch {
	interface EasySwitchResource extends Lowco.Domain.Core.Hal.BaseResource {
		easySwitchId: string;
	}
}
declare namespace Lowco.Domain.Views.Email {
	interface Alias {
		login: string;
		sequence: number;
	}
	interface Mailbox {
		aliases: Lowco.Domain.Views.Email.Alias[];
		canBeDeleted: boolean;
		domain: string;
		emailAddress: string;
		login: string;
		sequence: number;
	}
	interface MailboxAccount extends Lowco.Domain.Core.Hal.BaseResource {
		allowedDomains: string[];
		mailboxes: Lowco.Domain.Views.Email.Mailbox[];
		pointOfConsumptionId: string;
		sap14: string;
	}
	interface MailboxAccountCollection extends Lowco.Domain.Core.Hal.BaseResource {
		mailboxAccounts: Lowco.Domain.Views.Email.MailboxAccount[];
	}
}
declare namespace Lowco.Domain.Views.Fake {
	interface FakeContractInfo extends Lowco.Domain.Core.Hal.BaseResource {
		fakeContractId: string;
	}
}
declare namespace Lowco.Domain.Views.Legacy {
	interface LegacyCreditScore {
		currentPerdiodBalance: number;
		status: Lowco.Domain.Views.Legacy.CreditScoreStatus;
	}
	interface LegacyServicesInformation {
		status: Lowco.Domain.Views.Legacy.LegacyServicesStatus;
	}
}
declare namespace Lowco.Domain.Views.Mandate {
	interface Mandate extends Lowco.Domain.Core.Hal.BaseResource {
		iban: string;
		isUsed: boolean;
		productType: Lowco.Domain.Views.Mandate.MandateProductType;
		status: Lowco.Domain.Views.Mandate.MandateStatus;
		userStatus: Lowco.Domain.Views.Mandate.MandateUserStatus;
	}
	interface MandateCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Mandate.Mandate[];
	}
}
declare namespace Lowco.Domain.Views.Network {
	interface NetworkOperator extends Lowco.Domain.Core.Hal.BaseResource {
		cableOperatorName: string;
		label: string;
		legalOperatorName: string;
		operatorId: number;
		operatorName: string;
	}
	interface NetworkOperatorCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Network.NetworkOperator[];
	}
}
declare namespace Lowco.Domain.Views.NextBestOffer {
	interface Offer {
		id: string;
		type: Lowco.Domain.Views.NextBestOffer.OfferType;
	}
	interface OfferCollection extends Lowco.Domain.Core.Hal.BaseResource {
		offers: Lowco.Domain.Views.NextBestOffer.Offer[];
	}
}
declare namespace Lowco.Domain.Views.Phone {
	interface Phone extends Lowco.Domain.Core.Hal.BaseResource {
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
	interface PhoneCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Phone.Phone[];
	}
}
declare namespace Lowco.Domain.Views.Product {
	interface NetworkOperator {
		id: number;
		label: string;
		networkOperatorFullName: string;
		networkOperatorId: number;
		networkOperatorName: string;
	}
	interface OptionEligibility {
		eligible: boolean;
		option: Lowco.Domain.Core.Views.Catalog.Config.OptionConfig;
	}
	interface OptionIdentifier {
		externalId: string;
		phoneNumber: string;
		pointOfDeliveryId: string;
		sap14: string;
		type: Lowco.Domain.Core.Views.Catalog.Config.ProductType;
	}
	interface OptionPromo extends Lowco.Domain.Core.Hal.BaseResource {
		amount: number;
		endDate: Date;
		id: string;
		label: string;
		movement: Lowco.Domain.Views.Product.PromoMovementType;
	}
	interface OptionStatusResource extends Lowco.Domain.Core.Hal.BaseResource {
		key: string;
		mobileCreditLimit: number;
		status: Lowco.Domain.Views.Product.OptionStatus;
	}
	interface OptionViewCollectionResource extends Lowco.Domain.Core.Hal.BaseResource {
		activationStatuses: Lowco.Domain.Views.Product.Activation.ActivationStatusView[];
		options: Lowco.Domain.Views.Product.OptionViewResource[];
	}
	interface OptionViewResource extends Lowco.Domain.Core.Hal.BaseResource {
		activation: Lowco.Domain.Views.Product.Activation.Activatability;
		category: Lowco.Domain.Core.Views.Catalog.ProductCategory;
		creditLimit: number;
		discount: number;
		externalId: string;
		isIncludedInPack: boolean;
		key: string;
		onMostExpensive: Lowco.Domain.Core.Views.Catalog.DiscountInfo.OrderableDiscount;
		phoneNumber: string;
		pointOfDeliveryId: string;
		price: number;
		priceWithoutDiscount: number;
		promos: Lowco.Domain.Views.Product.OptionPromo[];
		sap14: string;
		simulated: boolean;
		simulationLocked: boolean;
		status: Lowco.Domain.Views.Product.OptionStatus;
	}
	interface OrderOptionsViewCollectionResource extends Lowco.Domain.Views.Product.OptionViewCollectionResource {
		basket: Lowco.Domain.Views.Product.OptionViewResource[];
	}
}
declare namespace Lowco.Domain.Views.Product.Activation {
	interface Activatability {
		exclusivities: string[];
		failure: boolean;
		migrations: string[];
		optionActivationAllowed: boolean;
		reason: Lowco.Domain.Views.Product.Activation.ActivationReason;
		requirements: string[];
	}
	interface ActivationStatusView {
		acknowledgementId: string;
		externalId: string;
		phoneNumber: string;
		reason: string;
		sap14: string;
		status: Lowco.Domain.Views.Product.Activation.ActivationExternalStatus;
	}
}
declare namespace Lowco.Domain.Views.Product.Downgrades {
	interface DowngradableOptionResource extends Lowco.Domain.Core.Hal.BaseResource {
		isDowngradable: boolean;
		isEligibleCustomer: boolean;
		optionId: string;
	}
	interface OptionProvisioningResource extends Lowco.Domain.Core.Hal.BaseResource {
		status: string;
	}
	interface VisOptionValidityResource extends Lowco.Domain.Core.Hal.BaseResource {
		status: string;
	}
}
declare namespace Lowco.Domain.Views.Product.Mobile {
	interface BoostDataUsage {
		data: Lowco.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface Company extends Lowco.Domain.Views.Product.Mobile.Contractor {
		companyName: string;
		vatNumber: string;
	}
	interface Contractor {
		firstName: string;
		gender: Lowco.Domain.Views.Product.Mobile.Contractor.GenderType;
		lastname: string;
		msisdn: string;
	}
	interface ContractStatus {
		status: Lowco.Domain.Views.Product.Mobile.ContractStatus.ContractStatusType;
	}
	interface CreditLimit {
		amount: number;
		definedByCustomer: boolean;
	}
	interface DomainConstants {
		purchaseUrl: string;
	}
	interface EuropeUsage {
		sms: Lowco.Domain.Views.Product.Mobile.UsageInfo;
		voice: Lowco.Domain.Views.Product.Mobile.UsageInfo;
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
	interface Individual extends Lowco.Domain.Views.Product.Mobile.Contractor {
	}
	interface MainUsage {
		data: Lowco.Domain.Views.Product.Mobile.UsageInfo;
		sms: Lowco.Domain.Views.Product.Mobile.UsageInfo;
		voice: Lowco.Domain.Views.Product.Mobile.UsageInfo;
		voice2VooMobile: Lowco.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface MobileCardHolder {
		firstname: string;
		lastname: string;
	}
	interface MobileInformation extends Lowco.Domain.Core.Hal.BaseResource {
		contractor: Lowco.Domain.Views.Product.Mobile.Contractor;
		subscriptions: Lowco.Domain.Views.Product.Mobile.MobileSubscription[];
	}
	interface MobileOffer {
		dataOnly: boolean;
		hardware: Lowco.Domain.Views.Product.Mobile.HardwareInfo;
		id: string;
		limit: Lowco.Domain.Views.Product.Mobile.CreditLimit;
		name: string;
		price: number;
		promotion: Lowco.Domain.Views.Product.Mobile.MobileOfferPromotion;
		services: Lowco.Domain.Views.Product.Mobile.MobilePricedProduct[];
	}
	interface MobileOfferPromotion {
		amount: number;
		endDate: Date;
		id: number;
	}
	interface MobilePricedProduct {
		category: Lowco.Domain.Core.Views.Catalog.ProductCategory;
		id: string;
		monthlyPrice: number;
		type: Lowco.Domain.Views.Product.ServiceType;
	}
	interface MobileProductDetail {
		id: string;
		name: string;
	}
	interface MobileSubscription extends Lowco.Domain.Core.Hal.BaseResource {
		balance: number;
		holder: Lowco.Domain.Views.Product.Mobile.MobileCardHolder;
		id: string;
		msisdn: number;
		offer: Lowco.Domain.Views.Product.Mobile.MobileOffer;
		simCard: Lowco.Domain.Views.Product.Mobile.SimCard;
		usage: Lowco.Domain.Views.Product.Mobile.MobileUsage;
		validTill: Date;
	}
	interface MobileUsage {
		boostData: Lowco.Domain.Views.Product.Mobile.BoostDataUsage;
		europe: Lowco.Domain.Views.Product.Mobile.EuropeUsage;
		main: Lowco.Domain.Views.Product.Mobile.MainUsage;
		niceDevice: Lowco.Domain.Views.Product.Mobile.NiceDeviceUsage;
		roaming: Lowco.Domain.Views.Product.Mobile.RoamingUsage;
	}
	interface NiceDeviceUsage {
		data: Lowco.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface RoamingUsage {
		money: Lowco.Domain.Views.Product.Mobile.UsageInfo;
	}
	interface SimCard {
		iccid: string;
		indicator: Lowco.Domain.Views.Product.Mobile.SimCardIndicator;
		name: string;
		puk: string;
		status: Lowco.Domain.Views.Product.Mobile.SimCardStatus;
	}
	interface TariffPlanView extends Lowco.Domain.Core.Hal.BaseResource {
		id: number;
		key: string;
	}
	interface UsageInfo {
		current: number;
		limit: number;
		unit: Lowco.Domain.Views.Product.Mobile.UsageUnit;
		unlimited: boolean;
	}
}
declare namespace Lowco.Domain.Views.Product.Mobile.Contractor {
}
declare namespace Lowco.Domain.Views.Product.Mobile.ContractStatus {
}
// declare namespace Lowco.Domain.Views.Product.Mobile.MobileOffer {
// 	interface <>c__DisplayClass34_0 {
// 		currentPlan: Lowco.Domain.Core.Views.Catalog.TariffPlan;
// 		otherPlan: Lowco.Domain.Core.Views.Catalog.TariffPlan;
// 	}
// }
// declare namespace Lowco.Domain.Views.Product.OrderOptionsViewCollectionResource {
// 	interface <>c {
// 		<>9: Lowco.Domain.Views.Product.OrderOptionsViewCollectionResource.<>c;
// 		<>910: any;
// 	}
// }
declare namespace Lowco.Domain.Views.Smartphone {
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
declare namespace Lowco.Domain.Views.TvParameters {
	interface TvParameters extends Lowco.Domain.Core.Hal.BaseResource {
		parentalControlMinAgeRating: string;
		parentalControlPinCode: string;
		vodPurchaseCode: string;
	}
}
declare namespace Lowco.Domain.Views.Usage.Average {
	interface UsageAverage extends Lowco.Domain.Core.Hal.BaseResource {
		usage: any;
	}
}
declare namespace Lowco.Domain.Views.Usage.Mobile {
	interface CallDetailRecord {
		cost: number;
		national: boolean;
		offPlan: boolean;
		phoneNumber: string;
		time: Date;
		type: Lowco.Domain.Views.Usage.Mobile.MobileDailyUsageType;
		unit: Lowco.Domain.Views.Usage.Mobile.UsageUnit;
		usage: number;
	}
	interface CallDetailRecordsHistory {
		items: Lowco.Domain.Views.Usage.Mobile.MobileDailyUsage[];
		summary: Lowco.Domain.Views.Usage.Mobile.UsageSummary;
		totalCount: number;
	}
	interface MobileDailyUsage {
		cost: number;
		date: Date;
		records: Lowco.Domain.Views.Usage.Mobile.CallDetailRecord[];
	}
	interface OutOfBundleUsage {
		cost: number;
		usage: number;
	}
	interface UsageSummary {
		details: Lowco.Domain.Views.Usage.Mobile.UsageSummary[];
		name: Lowco.Domain.Views.Usage.Mobile.OutOfBundleCategory;
		outOfBundleUsage: Lowco.Domain.Views.Usage.Mobile.OutOfBundleUsage;
	}
}
declare namespace Lowco.Domain.Views.Usage.Net {
	interface NetDailyUsage extends Lowco.Domain.Views.Usage.Net.NetUsageUnit {
		day: number;
		month: number;
		usageDay: Date;
		year: number;
	}
	interface NetMonthlyUsage extends Lowco.Domain.Views.Usage.Net.NetUsageUnit {
		connectionId: string;
		dailyUsages: Lowco.Domain.Views.Usage.Net.NetDailyUsage[];
		dailyUsageUnit: Lowco.Domain.Views.Usage.Net.NetUsageUnit.UnitType;
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
	interface NetMonthlyUsageCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Usage.Net.NetMonthlyUsage[];
	}
	interface NetUsageUnit extends Lowco.Domain.Core.Hal.BaseResource {
		downloadVolumeAsBytes: number;
		totalVolumeAsBytes: number;
		totalVolumeAsUnit: number;
		uploadVolumeAsBytes: number;
		usageUnit: Lowco.Domain.Views.Usage.Net.NetUsageUnit.UnitType;
		volumeMultiplicator: number;
	}
	interface NetYearlyUsage extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Usage.Net.NetMonthlyUsage[];
		monthlyUsageUnit: Lowco.Domain.Views.Usage.Net.NetUsageUnit.UnitType;
	}
}
declare namespace Lowco.Domain.Views.Usage.Net.NetUsageUnit {
}
// declare namespace Lowco.Domain.Views.Usage.Net.NetYearlyUsage {
// 	interface <>c {
// 		<>9: Lowco.Domain.Views.Usage.Net.NetYearlyUsage.<>c;
// 		<>940: any;
// 		<>941: any;
// 	}
// }
declare namespace Lowco.Domain.Views.Usage.Phone {
	interface PhoneDailyUsage extends Lowco.Domain.Core.Hal.BaseResource {
		callDeviceType: Lowco.Domain.Views.Usage.Phone.PhoneDailyUsage.DeviceType;
		callLocalisation: Lowco.Domain.Views.Usage.Phone.PhoneDailyUsage.Localisation;
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
	interface PhoneDailyUsageCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Usage.Phone.PhoneDailyUsage[];
		options: Lowco.Domain.Core.Views.Catalog.Config.OptionConfig[];
		outOfBundlePrice: number;
		outOfBundlePriceTVAC: number;
		totalVoiceCommunication: number;
	}
}
declare namespace Lowco.Domain.Views.Usage.Phone.PhoneDailyUsage {
}
// declare namespace Lowco.Domain.Views.Usage.Phone.PhoneDailyUsageCollection {
// 	interface <>c__DisplayClass22_0 {
// 		optionId: string;
// 	}
// }
declare namespace Lowco.Domain.Views.Usage.Vod {
	interface VodDailyUsage extends Lowco.Domain.Core.Hal.BaseResource {
		creationDateTime: Date;
		name: string;
		priceCurrency: string;
		priceHT: number;
		priceTTC: number;
		productType: string;
	}
	interface VodMonthlyUsage extends Lowco.Domain.Core.Hal.BaseResource {
		connectionId: string;
		count: number;
		dailyUsages: Lowco.Domain.Views.Usage.Vod.VodDailyUsage[];
		period: Date;
		periodStartDate: string;
		totalExvat: number;
		totalInvat: number;
	}
	interface VodMonthlyUsageCollection extends Lowco.Domain.Core.Hal.BaseResource {
		items: Lowco.Domain.Views.Usage.Vod.VodMonthlyUsage[];
	}
}
