"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, CheckCircle, Clock, Shield, User, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface KYCData {
  personalInfo: {
    firstName: string
    lastName: string
    middleName: string
    dateOfBirth: string
    gender: string
    nationality: string
    occupation: string
    address: string
    city: string
    state: string
    postalCode: string
  }
  documents: {
    idType: string
    idNumber: string
    idFrontImage: File | null
    idBackImage: File | null
    selfieImage: File | null
    proofOfAddress: File | null
  }
  verification: {
    phoneVerified: boolean
    emailVerified: boolean
    documentsSubmitted: boolean
    status: "pending" | "approved" | "rejected" | "incomplete"
  }
}

export default function KYCPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [kycData, setKycData] = useState<KYCData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "Nigerian",
      occupation: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    },
    documents: {
      idType: "",
      idNumber: "",
      idFrontImage: null,
      idBackImage: null,
      selfieImage: null,
      proofOfAddress: null,
    },
    verification: {
      phoneVerified: false,
      emailVerified: false,
      documentsSubmitted: false,
      status: "incomplete",
    },
  })

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Document Upload", icon: FileText },
    { id: 3, title: "Verification", icon: Shield },
    { id: 4, title: "Review & Submit", icon: CheckCircle },
  ]

  const idTypes = [
    { value: "nin", label: "National Identity Number (NIN)" },
    { value: "bvn", label: "Bank Verification Number (BVN)" },
    { value: "passport", label: "International Passport" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "voters_card", label: "Voter's Card" },
  ]

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ]

  const handleFileUpload = (field: keyof KYCData["documents"], file: File) => {
    setKycData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }))
  }

  const handlePersonalInfoChange = (field: keyof KYCData["personalInfo"], value: string) => {
    setKycData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const handleDocumentInfoChange = (field: keyof KYCData["documents"], value: string) => {
    setKycData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: value,
      },
    }))
  }

  const getStepProgress = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return (
          kycData.personalInfo.firstName &&
          kycData.personalInfo.lastName &&
          kycData.personalInfo.dateOfBirth &&
          kycData.personalInfo.address
        )
      case 2:
        return (
          kycData.documents.idType &&
          kycData.documents.idNumber &&
          kycData.documents.idFrontImage &&
          kycData.documents.selfieImage
        )
      case 3:
        return kycData.verification.phoneVerified && kycData.verification.emailVerified
      default:
        return true
    }
  }

  const handleSubmitKYC = () => {
    // Submit KYC data
    setKycData((prev) => ({
      ...prev,
      verification: {
        ...prev.verification,
        documentsSubmitted: true,
        status: "pending",
      },
    }))
    router.push("/kyc/submitted")
  }

  const FileUploadComponent = ({
    label,
    field,
    accept = "image/*",
    description,
  }: {
    label: string
    field: keyof KYCData["documents"]
    accept?: string
    description?: string
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed border-digix-blue-200 rounded-lg p-6 text-center">
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileUpload(field, file)
          }}
          className="hidden"
          id={field}
        />
        <label htmlFor={field} className="cursor-pointer">
          <Upload className="w-8 h-8 text-digix-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {kycData.documents[field] ? kycData.documents[field]!.name : "Click to upload or drag and drop"}
          </p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-digix-blue-600 hover:text-digix-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-digix-blue-900 mb-2">KYC Verification</h1>
          <p className="text-gray-600">Complete your identity verification to unlock all platform features</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-digix-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-digix-blue-900">Verification Progress</h3>
              <span className="text-sm text-gray-600">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <Progress value={getStepProgress()} className="mb-4" />
            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.id ? "bg-digix-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-600 mt-1 text-center">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="border-digix-blue-100">
          <CardContent className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-digix-blue-900 mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={kycData.personalInfo.firstName}
                        onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                        className="border-digix-blue-200 focus:border-digix-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={kycData.personalInfo.lastName}
                        onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                        className="border-digix-blue-200 focus:border-digix-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="middleName">Middle Name</Label>
                      <Input
                        id="middleName"
                        value={kycData.personalInfo.middleName}
                        onChange={(e) => handlePersonalInfoChange("middleName", e.target.value)}
                        className="border-digix-blue-200 focus:border-digix-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={kycData.personalInfo.dateOfBirth}
                        onChange={(e) => handlePersonalInfoChange("dateOfBirth", e.target.value)}
                        className="border-digix-blue-200 focus:border-digix-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={kycData.personalInfo.gender}
                        onValueChange={(value) => handlePersonalInfoChange("gender", value)}
                      >
                        <SelectTrigger className="border-digix-blue-200 focus:border-digix-blue-500">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={kycData.personalInfo.occupation}
                        onChange={(e) => handlePersonalInfoChange("occupation", e.target.value)}
                        className="border-digix-blue-200 focus:border-digix-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-digix-blue-900 mb-4">Address Information</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Textarea
                        id="address"
                        value={kycData.personalInfo.address}
                        onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                        className="border-digix-blue-200 focus:border-digix-blue-500"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={kycData.personalInfo.city}
                          onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
                          className="border-digix-blue-200 focus:border-digix-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={kycData.personalInfo.state}
                          onValueChange={(value) => handlePersonalInfoChange("state", value)}
                        >
                          <SelectTrigger className="border-digix-blue-200 focus:border-digix-blue-500">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {nigerianStates.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase()}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={kycData.personalInfo.postalCode}
                          onChange={(e) => handlePersonalInfoChange("postalCode", e.target.value)}
                          className="border-digix-blue-200 focus:border-digix-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-digix-blue-900 mb-4">Document Upload</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="idType">ID Type *</Label>
                      <Select
                        value={kycData.documents.idType}
                        onValueChange={(value) => handleDocumentInfoChange("idType", value)}
                      >
                        <SelectTrigger className="border-digix-blue-200 focus:border-digix-blue-500">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          {idTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="idNumber">ID Number *</Label>
                      <Input
                        id="idNumber"
                        value={kycData.documents.idNumber}
                        onChange={(e) => handleDocumentInfoChange("idNumber", e.target.value)}
                        className="border-digix-blue-200 focus:border-digix-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FileUploadComponent
                      label="ID Front Image *"
                      field="idFrontImage"
                      description="Clear photo of the front of your ID"
                    />
                    <FileUploadComponent
                      label="ID Back Image"
                      field="idBackImage"
                      description="Clear photo of the back of your ID (if applicable)"
                    />
                    <FileUploadComponent
                      label="Selfie with ID *"
                      field="selfieImage"
                      description="Take a selfie holding your ID next to your face"
                    />
                    <FileUploadComponent
                      label="Proof of Address"
                      field="proofOfAddress"
                      description="Utility bill, bank statement, or official document"
                    />
                  </div>
                </div>

                <div className="bg-digix-blue-50 p-4 rounded-lg border border-digix-blue-100">
                  <h4 className="font-medium text-digix-blue-900 mb-2">Document Requirements</h4>
                  <ul className="text-sm text-digix-blue-800 space-y-1">
                    <li>• Documents must be clear and readable</li>
                    <li>• All four corners of the document must be visible</li>
                    <li>• No glare or shadows on the document</li>
                    <li>• File size should not exceed 5MB</li>
                    <li>• Accepted formats: JPG, PNG, PDF</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-digix-blue-900 mb-4">Account Verification</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg border-digix-blue-100">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            kycData.verification.phoneVerified ? "bg-digix-green-100" : "bg-yellow-100"
                          }`}
                        >
                          {kycData.verification.phoneVerified ? (
                            <CheckCircle className="w-5 h-5 text-digix-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-digix-blue-900">Phone Verification</p>
                          <p className="text-sm text-gray-600">Verify your phone number with SMS</p>
                        </div>
                      </div>
                      <Button
                        variant={kycData.verification.phoneVerified ? "outline" : "default"}
                        size="sm"
                        className={
                          kycData.verification.phoneVerified
                            ? "border-digix-green-200 text-digix-green-600"
                            : "bg-digix-blue-600 hover:bg-digix-blue-700"
                        }
                        onClick={() =>
                          setKycData((prev) => ({
                            ...prev,
                            verification: { ...prev.verification, phoneVerified: true },
                          }))
                        }
                      >
                        {kycData.verification.phoneVerified ? "Verified" : "Verify"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg border-digix-blue-100">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            kycData.verification.emailVerified ? "bg-digix-green-100" : "bg-yellow-100"
                          }`}
                        >
                          {kycData.verification.emailVerified ? (
                            <CheckCircle className="w-5 h-5 text-digix-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-digix-blue-900">Email Verification</p>
                          <p className="text-sm text-gray-600">Verify your email address</p>
                        </div>
                      </div>
                      <Button
                        variant={kycData.verification.emailVerified ? "outline" : "default"}
                        size="sm"
                        className={
                          kycData.verification.emailVerified
                            ? "border-digix-green-200 text-digix-green-600"
                            : "bg-digix-blue-600 hover:bg-digix-blue-700"
                        }
                        onClick={() =>
                          setKycData((prev) => ({
                            ...prev,
                            verification: { ...prev.verification, emailVerified: true },
                          }))
                        }
                      >
                        {kycData.verification.emailVerified ? "Verified" : "Verify"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-digix-blue-900 mb-4">Review & Submit</h3>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-digix-blue-900 mb-3">Personal Information</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <span className="ml-2 font-medium">
                            {kycData.personalInfo.firstName} {kycData.personalInfo.lastName}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Date of Birth:</span>
                          <span className="ml-2 font-medium">{kycData.personalInfo.dateOfBirth}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <span className="ml-2 font-medium">{kycData.personalInfo.address}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">State:</span>
                          <span className="ml-2 font-medium">{kycData.personalInfo.state}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-digix-blue-900 mb-3">Documents</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">ID Type:</span>
                          <span className="ml-2 font-medium">
                            {idTypes.find((t) => t.value === kycData.documents.idType)?.label}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">ID Number:</span>
                          <span className="ml-2 font-medium">{kycData.documents.idNumber}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Documents Uploaded:</span>
                          <span className="ml-2 font-medium">
                            {[kycData.documents.idFrontImage, kycData.documents.selfieImage].filter(Boolean).length} of
                            2 required
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-digix-green-50 p-4 rounded-lg border border-digix-green-100">
                      <h4 className="font-medium text-digix-green-900 mb-2">What happens next?</h4>
                      <ul className="text-sm text-digix-green-800 space-y-1">
                        <li>• Your documents will be reviewed within 24-48 hours</li>
                        <li>• You'll receive email and SMS notifications about your status</li>
                        <li>• Once approved, you'll have access to all platform features</li>
                        <li>• Higher transaction limits and reduced fees</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="border-digix-blue-200 text-digix-blue-600"
              >
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNextStep()}
                  className="bg-digix-blue-600 hover:bg-digix-blue-700"
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmitKYC} className="bg-digix-green-600 hover:bg-digix-green-700">
                  Submit for Review
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
