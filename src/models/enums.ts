namespace System {
	export const enum UriHostNameType {
		Unknown = 0,
		Basic = 1,
		Dns = 2,
		IPv4 = 3,
		IPv6 = 4
	}
}
namespace System.Net {
	export const enum FtpStatusCode {
		Undefined = 0,
		RestartMarker = 110,
		ServiceTemporarilyNotAvailable = 120,
		DataAlreadyOpen = 125,
		OpeningData = 150,
		CommandOK = 200,
		CommandExtraneous = 202,
		DirectoryStatus = 212,
		FileStatus = 213,
		SystemType = 215,
		SendUserCommand = 220,
		ClosingControl = 221,
		ClosingData = 226,
		EnteringPassive = 227,
		LoggedInProceed = 230,
		ServerWantsSecureSession = 234,
		FileActionOK = 250,
		PathnameCreated = 257,
		SendPasswordCommand = 331,
		NeedLoginAccount = 332,
		FileCommandPending = 350,
		ServiceNotAvailable = 421,
		CantOpenData = 425,
		ConnectionClosed = 426,
		ActionNotTakenFileUnavailableOrBusy = 450,
		ActionAbortedLocalProcessingError = 451,
		ActionNotTakenInsufficientSpace = 452,
		CommandSyntaxError = 500,
		ArgumentSyntaxError = 501,
		CommandNotImplemented = 502,
		BadCommandSequence = 503,
		NotLoggedIn = 530,
		AccountNeeded = 532,
		ActionNotTakenFileUnavailable = 550,
		ActionAbortedUnknownPageType = 551,
		FileActionAborted = 552,
		ActionNotTakenFilenameNotAllowed = 553
	}
}
namespace Lowco.Domain.Core.Views.Catalog {
	export const enum ProductCategory {
		Unspecified = 0,
		Internet = 1,
		Television = 2,
		Phone = 3,
		Mobile = 4
	}
}
namespace Lowco.Domain.Core.Views.Catalog.Config {
	export const enum ActivationSource {
		Undefined = 0,
		AcbisPhoneActivation = 1,
		ManageMobileOptionActivation = 2,
		SubscribeToOptionActivation = 3,
		ManageOptionActivation = 4,
		ActivateOptionActivation = 5,
		PurchaseOrder = 6
	}
	export const enum OptionClass {
		Unspecified = 0,
		DeviceCentric = 1,
		ContractCentric = 2,
		CustomerCentric = 3
	}
	export const enum OptionGroup {
		None = 0,
		Betv = 1,
		CommercialParameter = 2
	}
	export const enum ProductType {
		Unspecified = 0,
		VOOmotion = 1,
		VOOmotionVirtualDecoder = 2,
		ModemRouter = 3,
		InternetSecurity = 4,
		Homespot = 5,
		Panorama = 6,
		CinePass = 7,
		DisplayCaller = 8,
		DisplayPhoneNumberForOneCall = 9,
		HidePhoneNumber = 10,
		HidePhoneNumberForOneCall = 11,
		BlockSpecialNumbers = 12,
		InternationalOption = 13,
		IncomingCallSignal = 14,
		RedialLastCaller = 15,
		VooFoot_JPL = 16,
		FixedToMobile = 17,
		RTLSeriesPass = 18,
		RTLInfinite = 19,
		Voocorder = 20,
		Evasion = 21,
		Soho = 22,
		MobileCreditLimit = 23,
		MobileBoostData = 24,
		MobileEurope = 25,
		MobileEuropeInternational = 26,
		RoamingPass = 27,
		VooCloudPro = 28,
		MobileNiceDevice = 29,
		BeFiction = 30,
		DisneyCinema = 31,
		Eleven = 32,
		VOOSportWorld = 33,
		BeBouquetDocumentaire = 34,
		BeBouquetEnfant = 35,
		BeBouquetDivertissement = 36,
		BeBouquetSport = 37,
		BeBouquetSelection = 38,
		BeBouquetCool = 39,
		BeOptionCinema = 40,
		BeOptionInfo = 41,
		BeOptionSensation = 42,
		BeOptionCharme = 43,
		BeOptionManX = 44,
		CanalPlay = 45,
		Param_Block_Roaming = 46,
		Param_Block_International_Calls = 47,
		Param_Block_International_Data = 48,
		Param_Block_Special_And_Adult_Calls = 49,
		Param_Block_Special_And_Non_Adult_Calls = 50,
		Param_Remove_Data_Roaming_Limit = 51,
		FamilyFun = 52,
		DiscoverMore = 53,
		ClasseX = 54
	}
	export const enum ReturnedByType {
		Unspecified = 0,
		Sap = 1,
		Acbis = 2,
		Effortel = 3
	}
}
namespace Lowco.Domain.Core.Views.Catalog.Config.OptionConfig.Bundle {
	export const enum BundleType {
		Data = 0,
		Voice = 1,
		Sms = 2
	}
	export const enum BundleUnit {
		KB = 0,
		Sec = 1,
		SMS = 2
	}
}
namespace Lowco.Domain.Core.Views.Catalog.DiscountInfo {
	export const enum OrderableDiscountType {
		DiscountEnabler = 0,
		DiscountTarget = 1
	}
}
namespace Lowco.Domain.Core.Views.Customer.Eligibilty {
	export const enum RefusalReason4P {
		FixAndMobileRejected = 0,
		NotOnebillEligible = 1,
		CustomerIn4pSituation = 2,
		MobileSubscriptionNotAllowed = 3
	}
}
namespace Lowco.Domain.Views.Billing {
	export const enum BillingDocumentType {
		CreditNote = 0,
		CreditNoteCancellation = 1,
		DunningLetter = 2,
		Invoice = 3,
		InvoiceCancellation = 4,
		TerminationInvoice = 5,
		Undefined = 6
	}
	export const enum PaymentStatusType {
		Cancelled = 'Cancelled',
		Paid = 'Paid',
		PartiallyPaid = 'PartiallyPaid',
		UnPaid = 'UnPaid',
		PartiallyUnPaid = 'PartiallyUnPaid',
		ToBePaid = 'ToBePaid',
		Clearance_Plan = 'Clearance_Plan',
		Undefined = 'Undefined'
	}
	export const enum ProductType {
		Pack = 0,
		Mobile = 1,
		Television = 2,
		Other = 3
	}
}
namespace Lowco.Domain.Views.Billing.Account {
	export const enum invoiceDeliveryType {
		Nothing = 0,
		Ebilling = 1,
		Paper = 2,
		Zoomit = 3,
		Hybrid = 4,
		Migration = 5
	}
}
namespace Lowco.Domain.Views.CreditCheck {
	export const enum CreditScoreColor {
		Black = 0,
		Green = 1,
		Orange = 2,
		Red = 3,
		Yellow = 4
	}
	export const enum CreditScoreValue {
		CrecoAuthorization = 0,
		FullActivation = 1,
		Rejected = 2,
		RestrictedActivation = 3
	}
}
namespace Lowco.Domain.Views.Cuca {
	export const enum UserAccountStatus {
		Unspecified = 0,
		NoAccount = 1,
		Inactive = 2,
		Active = 3,
		Suspended = 4,
		Blocked = 5,
		Deactivated = 6
	}
}
namespace Lowco.Domain.Views.Customer {
	export const enum AddressType {
		Unspecified = 0,
		Contact = 1,
		Usage = 2,
		Billing = 3
	}
}
namespace Lowco.Domain.Views.Document {
	export const enum DocumentProductType {
		Pack = 0,
		Tv = 1,
		Mobile = 2,
		Xp = 3,
		Undefined = 4
	}
	export const enum DocumentType {
		Contract = 0,
		Quotation = 1,
		WorkServices = 2,
		NonCompliant = 3,
		PickupEquipment = 4,
		InterventionReport = 5,
		LetterOfAuthorization = 6,
		Undefined = 7
	}
}
namespace Lowco.Domain.Views.Legacy {
	export const enum CreditScoreStatus {
		OK = 0,
		NOK = 1
	}
	export const enum LegacyServicesStatus {
		Nothing = 0,
		Old = 1,
		Migrating = 2,
		Migration_done = 3,
		Legacy = 4
	}
}
namespace Lowco.Domain.Views.Mandate {
	export const enum MandateProductType {
		Undefined = 0,
		Fixed = 1,
		Mobile = 2
	}
	export const enum MandateStatus {
		NotSet = 0,
		Submitted = 1,
		Active = 2,
		ToBeConfirmed = 3,
		Blocked = 4,
		Cancelled = 5,
		Obsolete = 6,
		Terminated = 7
	}
	export const enum MandateUserStatus {
		None = 0,
		NotSentToBpost = 1,
		SentToBpost = 2,
		ReceivedFromBpost = 3,
		ReceivedFromWeb = 4
	}
}
namespace Lowco.Domain.Views.NextBestOffer {
	export const enum OfferType {
		Pack = 0,
		Option = 1
	}
}
namespace Lowco.Domain.Views.Product {
	export const enum OptionStatus {
		Unspecified = 0,
		Active = 1,
		Inactive = 2,
		PendingActive = 3,
		PendingInactive = 4
	}
	export const enum PromoMovementType {
		Acquisition = 0,
		Retention = 1,
		Tap = 2
	}
	export const enum ServiceType {
		Unspecified = 0,
		Add_On = 1,
		Option = 2
	}
}
namespace Lowco.Domain.Views.Product.Activation {
	export const enum ActivationExternalStatus {
		NotSpecified = 0,
		Failure = 1
	}
	export const enum ActivationReason {
		ActivationAllowed = 0,
		DeniedForFixFullActivation = 1,
		DeniedForMobileFullActivation = 2,
		DeniedForMultipleTvProducts = 3,
		DeniedForMultipleTelProducts = 4,
		DeniedForBetvFullActivation = 5,
		DeniedForOptionExclusivity = 6,
		DeniedForRequirement = 7,
		DeniedSpecialRule = 8,
		DeniedAlwaysActive = 9,
		DeniedForPendingOperation = 10
	}
}
namespace Lowco.Domain.Views.Product.Mobile {
	export const enum SimCardIndicator {
		Green = 0,
		Orange = 1,
		Lock = 2
	}
	export const enum SimCardStatus {
		Unspecified = 0,
		Active = 1,
		ActiveWithRestrictions = 2,
		LostAndStolen = 3,
		RestrictedForAdministrativeReasons = 4,
		RestrictedDueToPendingInvoice = 5,
		Inactive = 6
	}
	export const enum UsageUnit {
		Sms = 0,
		Seconds = 1,
		Minutes = 2,
		Kilobytes = 3,
		Megabytes = 4,
		Gigabytes = 5,
		Mms = 6,
		Eur = 7
	}
}
namespace Lowco.Domain.Views.Product.Mobile.Contractor {
	export const enum GenderType {
		MALE = 0,
		FEMALE = 1
	}
}
namespace Lowco.Domain.Views.Product.Mobile.ContractStatus {
	export const enum ContractStatusType {
		ACTIVE = 0,
		INACTIVE = 1,
		NEW = 2
	}
}
namespace Lowco.Domain.Views.Usage.Average {
	export const enum AverageType {
		NetTel = 0,
		Mobile = 1
	}
}
namespace Lowco.Domain.Views.Usage.Mobile {
	export const enum MobileDailyUsageType {
		Voice = 0,
		Sms = 1,
		Data = 2
	}
	export const enum OutOfBundleCategory {
		OutOfBundle = 0,
		Sms = 1,
		Voice = 2,
		Data = 3,
		National = 4,
		International = 5
	}
	export const enum UsageUnit {
		Second = 0,
		Megabyte = 1
	}
}
namespace Lowco.Domain.Views.Usage.Net.NetUsageUnit {
	export const enum UnitType {
		None = 0,
		Mb = 1,
		Gb = 2
	}
}
namespace Lowco.Domain.Views.Usage.Phone.PhoneDailyUsage {
	export const enum DeviceType {
		Unspecified = 'Unspecified',
		Fixe = 'Fixe',
		Mobile = 'Mobile'
	}
	export const enum Localisation {
		Unspecified = 'Unspecified',
		National = 'National',
		International = 'International'
	}
}
