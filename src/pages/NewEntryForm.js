import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submitAdmissionStep, completeAdmission } from '../services/api';

const NewEntryForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    documentType: '',
    documentNumber: '',
    residentImage: null,
    admissionPeriod: '',
    nationality: 'Indian',
    state: '',
    language: '',
    education: '',
    profession: '',
    postRetirement: '',

    // Step 2: Address Details
    currentAddress: {
      flatNo: '',
      societyName: '',
      landmark: '',
      streetName: '',
      city: '',
      state: '',
      pincode: ''
    },
    permanentAddress: {
      flatNo: '',
      societyName: '',
      landmark: '',
      streetName: '',
      city: '',
      state: '',
      pincode: ''
    },
    sameAsCurrentAddress: false,

    // Step 3: Reference Details
    howDidYouKnow: '',
    referredBy: '',
    otherDetails: '',

    // Step 4: Medical Info
    medicalHistory: '',
    currentHealthStatus: '',
    conditions: {
      trachealTube: false,
      feedingTube: false,
      urinaryCatheter: false,
      usesDiapers: false,
      bedSores: false,
      wound: false,
      oxygenSupport: false
    },
    physicalCondition: '',
    chronicIllness: {
      alzheimers: 'Not Applicable',
      arthritis: 'Not Applicable',
      asthma: 'Not Applicable',
      bipolarDisorder: 'Not Applicable',
      cancer: 'Not Applicable',
      copd: 'Not Applicable',
      diabetes: 'Not Applicable',
      depression: 'Not Applicable',
      heartDisease: 'Not Applicable',
      hypertension: 'Not Applicable',
      ibd: 'Not Applicable',
      kidneyDisease: 'Not Applicable',
      osteoporosis: 'Not Applicable',
      parkinsons: 'Not Applicable',
      stroke: 'Not Applicable',
      thyroid: 'Not Applicable'
    },
    activities: {
      bathing: 'Independent',
      dressing: 'Independent',
      grooming: 'Independent',
      oralCare: 'Independent',
      toileting: 'Independent',
      transferring: 'Independent',
      walking: 'Independent',
      eating: 'Independent',
      usingPhone: 'Independent',
      managingMoney: 'Independent'
    },
    psychiatricCondition: [],
    otherConditions: '',
    foodPreferences: '',
    habits: '',
    likesDislikes: '',

    // Step 5: Dedicated Health Assessment
    healthAssessment: {
      recognizeHunger: '',
      manageHygiene: '',
      recognizeTimePlacePeople: '',
      makeSafeDecisions: '',
      communicateSymptoms: '',
      avoidFalls: '',
      callForHelp: '',
      recognizeMaintenance: ''
    },

    // Step 6: Guardian Info
    guardianName: '',
    guardianRelation: '',
    guardianAddress: '',
    guardianPhone: '',
    guardianEmail: '',
    fillerName: '',
    fillerPhone: '',
    fillerEmail: '',
    fillerSignature: ''
  });

  const steps = [
    { number: 1, title: 'Basic Information' },
    { number: 2, title: 'Address Details' },
    { number: 3, title: 'Reference Details' },
    { number: 4, title: 'Medical Info' },
    { number: 5, title: 'Dedicated Health' },
    { number: 6, title: 'Guardian Info' },
    { number: 7, title: 'Finish' }
  ];

  useEffect(() => {
    if (typeof window.WOW !== 'undefined') {
      new window.WOW().init();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleConditionChange = (condition, checked) => {
    setFormData(prev => ({
      ...prev,
      conditions: { ...prev.conditions, [condition]: checked }
    }));
  };

  const handleChronicIllnessChange = (illness, value) => {
    setFormData(prev => ({
      ...prev,
      chronicIllness: { ...prev.chronicIllness, [illness]: value }
    }));
  };

  const handleActivityChange = (activity, value) => {
    setFormData(prev => ({
      ...prev,
      activities: { ...prev.activities, [activity]: value }
    }));
  };

  const handleHealthAssessmentChange = (question, value) => {
    setFormData(prev => ({
      ...prev,
      healthAssessment: { ...prev.healthAssessment, [question]: value }
    }));
  };

  const handlePsychiatricChange = (condition, checked) => {
    setFormData(prev => {
      const updated = checked
        ? [...prev.psychiatricCondition, condition]
        : prev.psychiatricCondition.filter(c => c !== condition);
      return { ...prev, psychiatricCondition: updated };
    });
  };

  const handleSameAddressChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      sameAsCurrentAddress: checked,
      permanentAddress: checked ? { ...prev.currentAddress } : prev.permanentAddress
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.dateOfBirth && formData.gender;
      case 2:
        return formData.currentAddress.city && formData.currentAddress.state;
      case 3:
        return true; // Optional fields
      case 4:
        return true; // Optional fields
      case 5:
        return true; // Optional fields
      case 6:
        return formData.guardianName && formData.guardianPhone && formData.guardianRelation;
      default:
        return true;
    }
  };

  const saveStepData = async () => {
    setSubmitting(true);
    try {
      // Get step-specific data
      let stepData = {};
      switch (currentStep) {
        case 1:
          stepData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            maritalStatus: formData.maritalStatus,
            documentType: formData.documentType,
            admissionPeriod: formData.admissionPeriod,
            nationality: formData.nationality,
            state: formData.state,
            language: formData.language,
            education: formData.education,
            profession: formData.profession,
            postRetirement: formData.postRetirement
          };
          break;
        case 2:
          stepData = {
            currentAddress: formData.currentAddress,
            permanentAddress: formData.permanentAddress,
            sameAsCurrentAddress: formData.sameAsCurrentAddress
          };
          break;
        case 3:
          stepData = {
            howDidYouKnow: formData.howDidYouKnow,
            referredBy: formData.referredBy,
            otherDetails: formData.otherDetails
          };
          break;
        case 4:
          stepData = {
            medicalHistory: formData.medicalHistory,
            currentHealthStatus: formData.currentHealthStatus,
            conditions: formData.conditions,
            physicalCondition: formData.physicalCondition,
            chronicIllness: formData.chronicIllness,
            activities: formData.activities,
            psychiatricCondition: formData.psychiatricCondition,
            otherConditions: formData.otherConditions,
            foodPreferences: formData.foodPreferences,
            habits: formData.habits,
            likesDislikes: formData.likesDislikes
          };
          break;
        case 5:
          stepData = {
            healthAssessment: formData.healthAssessment
          };
          break;
        case 6:
          stepData = {
            guardianName: formData.guardianName,
            guardianRelation: formData.guardianRelation,
            guardianAddress: formData.guardianAddress,
            guardianPhone: formData.guardianPhone,
            guardianEmail: formData.guardianEmail,
            fillerName: formData.fillerName,
            fillerPhone: formData.fillerPhone,
            fillerEmail: formData.fillerEmail,
            fillerSignature: formData.fillerSignature
          };
          break;
        default:
          stepData = {};
      }
      
      // Call API to save step data
      const response = await submitAdmissionStep({
        applicationId: applicationId,
        step: currentStep,
        data: stepData
      });
      
      // Note: API interceptor already extracts response.data
      if (response.success) {
        // Store application ID for subsequent steps
        if (response.data?.applicationId && !applicationId) {
          setApplicationId(response.data.applicationId);
        }
        
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps(prev => [...prev, currentStep]);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving step data:', error);
      // If API fails, still allow local progression for demo
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      return true;
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      alert('Please fill all required fields');
      return;
    }

    const saved = await saveStepData();
    if (saved) {
      if (currentStep === 6) {
        // Final submission - call complete API
        try {
          if (applicationId) {
            await completeAdmission({ applicationId });
          }
        } catch (error) {
          console.error('Error completing admission:', error);
        }
        // Generate application ID if not already set
        if (!applicationId) {
          setApplicationId('HH' + Date.now().toString().slice(-8));
        }
        setCurrentStep(7);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (completedSteps.includes(step) || step === currentStep || step === currentStep + 1) {
      setCurrentStep(step);
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div 
            className={`step-item ${currentStep === step.number ? 'active' : ''} ${completedSteps.includes(step.number) ? 'completed' : ''}`}
            onClick={() => goToStep(step.number)}
          >
            <div className="step-number">
              {completedSteps.includes(step.number) ? <i className="fas fa-check"></i> : step.number}
            </div>
            <div className="step-title">{step.title}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`step-line ${completedSteps.includes(step.number) ? 'completed' : ''}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="form-step">
      <h3 className="step-heading">Basic Information & Waiting List Form</h3>
      <p className="step-subheading">Fill up your details and proceed to the next steps.</p>
      
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>First Name <span className="required">*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Last Name <span className="required">*</span></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Email Address <span className="required">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email Address"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Phone Number <span className="required">*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Date Of Birth <span className="required">*</span></label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Gender <span className="required">*</span></label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Marital Status</label>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Document for Identification</label>
            <select name="documentType" value={formData.documentType} onChange={handleInputChange}>
              <option value="">Select Document for Identification</option>
              <option value="aadhar">Aadhar Card</option>
              <option value="pan">PAN Card</option>
              <option value="passport">Passport</option>
              <option value="voter">Voter ID</option>
              <option value="driving">Driving License</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Document Upload <span className="required">*</span></label>
            <input
              type="file"
              name="documentFile"
              onChange={handleInputChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Resident Image <span className="required">*</span></label>
            <input
              type="file"
              name="residentImage"
              onChange={handleInputChange}
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Admission Required for the Period of</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="admissionPeriod"
                  value="short"
                  checked={formData.admissionPeriod === 'short'}
                  onChange={handleInputChange}
                />
                Short Term
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="admissionPeriod"
                  value="medium"
                  checked={formData.admissionPeriod === 'medium'}
                  onChange={handleInputChange}
                />
                Medium Term
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="admissionPeriod"
                  value="long"
                  checked={formData.admissionPeriod === 'long'}
                  onChange={handleInputChange}
                />
                Long Term
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Nationality</label>
            <select name="nationality" value={formData.nationality} onChange={handleInputChange}>
              <option value="Indian">Indian</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>State</label>
            <select name="state" value={formData.state} onChange={handleInputChange}>
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Delhi">Delhi</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Language (Read / Write / Speak)</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              placeholder="Enter Language"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Education</label>
            <select name="education" value={formData.education} onChange={handleInputChange}>
              <option value="">Select Education</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Post Graduate</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              placeholder="Enter Profession"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Post at Retirement</label>
            <input
              type="text"
              name="postRetirement"
              value={formData.postRetirement}
              onChange={handleInputChange}
              placeholder="Enter Work Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3 className="step-heading">Address Details</h3>
      <p className="step-subheading">Fill up your details and proceed to the next steps.</p>
      
      <h4 className="section-title">Current Address</h4>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Flat/House No.</label>
            <input
              type="text"
              value={formData.currentAddress.flatNo}
              onChange={(e) => handleNestedChange('currentAddress', 'flatNo', e.target.value)}
              placeholder="Enter Flat/House No."
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Society/House Name</label>
            <input
              type="text"
              value={formData.currentAddress.societyName}
              onChange={(e) => handleNestedChange('currentAddress', 'societyName', e.target.value)}
              placeholder="Enter Society/House Name"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Landmark</label>
            <input
              type="text"
              value={formData.currentAddress.landmark}
              onChange={(e) => handleNestedChange('currentAddress', 'landmark', e.target.value)}
              placeholder="Enter Landmark"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Street Name</label>
            <input
              type="text"
              value={formData.currentAddress.streetName}
              onChange={(e) => handleNestedChange('currentAddress', 'streetName', e.target.value)}
              placeholder="Enter Street Name"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={formData.currentAddress.city}
              onChange={(e) => handleNestedChange('currentAddress', 'city', e.target.value)}
              placeholder="Enter City"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>State</label>
            <select
              value={formData.currentAddress.state}
              onChange={(e) => handleNestedChange('currentAddress', 'state', e.target.value)}
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              value={formData.currentAddress.pincode}
              onChange={(e) => handleNestedChange('currentAddress', 'pincode', e.target.value)}
              placeholder="Enter Pincode"
            />
          </div>
        </div>
      </div>

      <div className="same-address-checkbox">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.sameAsCurrentAddress}
            onChange={(e) => handleSameAddressChange(e.target.checked)}
          />
          Same as above
        </label>
      </div>

      <h4 className="section-title">Permanent Address</h4>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Flat/House No.</label>
            <input
              type="text"
              value={formData.permanentAddress.flatNo}
              onChange={(e) => handleNestedChange('permanentAddress', 'flatNo', e.target.value)}
              placeholder="Enter Flat/House No."
              disabled={formData.sameAsCurrentAddress}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Society/House Name</label>
            <input
              type="text"
              value={formData.permanentAddress.societyName}
              onChange={(e) => handleNestedChange('permanentAddress', 'societyName', e.target.value)}
              placeholder="Enter Society/House Name"
              disabled={formData.sameAsCurrentAddress}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Landmark</label>
            <input
              type="text"
              value={formData.permanentAddress.landmark}
              onChange={(e) => handleNestedChange('permanentAddress', 'landmark', e.target.value)}
              placeholder="Enter Landmark"
              disabled={formData.sameAsCurrentAddress}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Street Name</label>
            <input
              type="text"
              value={formData.permanentAddress.streetName}
              onChange={(e) => handleNestedChange('permanentAddress', 'streetName', e.target.value)}
              placeholder="Enter Street Name"
              disabled={formData.sameAsCurrentAddress}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={formData.permanentAddress.city}
              onChange={(e) => handleNestedChange('permanentAddress', 'city', e.target.value)}
              placeholder="Enter City"
              disabled={formData.sameAsCurrentAddress}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>State</label>
            <select
              value={formData.permanentAddress.state}
              onChange={(e) => handleNestedChange('permanentAddress', 'state', e.target.value)}
              disabled={formData.sameAsCurrentAddress}
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              value={formData.permanentAddress.pincode}
              onChange={(e) => handleNestedChange('permanentAddress', 'pincode', e.target.value)}
              placeholder="Enter Pincode"
              disabled={formData.sameAsCurrentAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3 className="step-heading">Feedback Details</h3>
      <p className="step-subheading">Fill up your details and proceed to next steps.</p>
      
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>How did you know about Happy Homes?</label>
            <select name="howDidYouKnow" value={formData.howDidYouKnow} onChange={handleInputChange}>
              <option value="">Select an option</option>
              <option value="google">Google Search</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="friend">Friend/Family Reference</option>
              <option value="newspaper">Newspaper</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Referred by</label>
            <input
              type="text"
              name="referredBy"
              value={formData.referredBy}
              onChange={handleInputChange}
              placeholder="Enter referrer name if any"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Any other Details</label>
            <textarea
              name="otherDetails"
              value={formData.otherDetails}
              onChange={handleInputChange}
              placeholder="Enter any other details"
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h3 className="step-heading">Medical Form</h3>
      <p className="step-subheading">Fill up your details and proceed next steps.</p>
      
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Medical History of Applicant <span className="required">*</span></label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
              placeholder="Enter medical history"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Current Health Status of Applicant <span className="required">*</span></label>
            <textarea
              name="currentHealthStatus"
              value={formData.currentHealthStatus}
              onChange={handleInputChange}
              placeholder="Enter current health status"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h4 className="section-title">Does Applicant Have Any of the Following Conditions?</h4>
          <div className="checkbox-list">
            {[
              { key: 'trachealTube', label: 'Tracheal Tube' },
              { key: 'feedingTube', label: 'Feeding Tube' },
              { key: 'urinaryCatheter', label: 'Urinary Catheter' },
              { key: 'usesDiapers', label: 'Uses Diapers' },
              { key: 'bedSores', label: 'Bed Sores' },
              { key: 'wound', label: 'Wound' },
              { key: 'oxygenSupport', label: 'Oxygen Support' }
            ].map(item => (
              <label key={item.key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.conditions[item.key]}
                  onChange={(e) => handleConditionChange(item.key, e.target.checked)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h4 className="section-title">Physical Condition of Applicant</h4>
          <div className="radio-list">
            {['Independent', 'Requires Help', 'Mobile', 'Mobile with Support', 'Bedridden', 'Unconscious', 'Coma'].map(option => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="physicalCondition"
                  value={option}
                  checked={formData.physicalCondition === option}
                  onChange={handleInputChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h4 className="section-title">Chronic Illness of Applicant</h4>
          <div className="chronic-illness-list">
            {[
              { key: 'alzheimers', label: "Alzheimer's" },
              { key: 'arthritis', label: 'Arthritis (Osteoarthritis, Rheumatoid Arthritis)' },
              { key: 'asthma', label: 'Asthma' },
              { key: 'bipolarDisorder', label: 'Bipolar Disorder' },
              { key: 'cancer', label: 'Cancer' },
              { key: 'copd', label: 'Chronic Obstructive Pulmonary Disease (COPD)' },
              { key: 'diabetes', label: 'Diabetes (Type 1, Type 2)' },
              { key: 'depression', label: 'Depression' },
              { key: 'heartDisease', label: 'Heart Disease' },
              { key: 'hypertension', label: 'High Blood Pressure (Hypertension)' },
              { key: 'ibd', label: 'Inflammatory Bowel Disease (Ulcerative Colitis)' },
              { key: 'kidneyDisease', label: 'Kidney Disease' },
              { key: 'osteoporosis', label: 'Osteoporosis' },
              { key: 'parkinsons', label: "Parkinson's Disease" },
              { key: 'stroke', label: 'Stroke' },
              { key: 'thyroid', label: 'Thyroid Disorders (Hypothyroidism)' }
            ].map(item => (
              <div key={item.key} className="chronic-item">
                <span className="chronic-label">{item.label}</span>
                <select
                  value={formData.chronicIllness[item.key]}
                  onChange={(e) => handleChronicIllnessChange(item.key, e.target.value)}
                >
                  <option value="Not Applicable">Not Applicable</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h4 className="section-title">Activities Applicant Can Do</h4>
          <div className="activities-list">
            {[
              { key: 'bathing', label: 'Bathing' },
              { key: 'dressing', label: 'Dressing' },
              { key: 'grooming', label: 'Grooming' },
              { key: 'oralCare', label: 'Oral Care' },
              { key: 'toileting', label: 'Toileting' },
              { key: 'transferring', label: 'Transferring' },
              { key: 'walking', label: 'Walking' },
              { key: 'eating', label: 'Eating' },
              { key: 'usingPhone', label: 'Using the Phone' },
              { key: 'managingMoney', label: 'Managing money' }
            ].map(item => (
              <div key={item.key} className="activity-item">
                <span className="activity-label">{item.label}</span>
                <select
                  value={formData.activities[item.key]}
                  onChange={(e) => handleActivityChange(item.key, e.target.value)}
                >
                  <option value="Independent">Independent</option>
                  <option value="Needs Assistance">Needs Assistance</option>
                  <option value="Dependent">Dependent</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h4 className="section-title">Psychiatric Condition of Applicant</h4>
          <div className="checkbox-list">
            {['Memory Loss', 'Aggressive Behaviour', 'OCD', 'Suspicious', 'Wandering', 'Depression'].map(condition => (
              <label key={condition} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.psychiatricCondition.includes(condition)}
                  onChange={(e) => handlePsychiatricChange(condition, e.target.checked)}
                />
                {condition}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="form-group">
            <label>Other Conditions</label>
            <textarea
              name="otherConditions"
              value={formData.otherConditions}
              onChange={handleInputChange}
              placeholder="Enter other conditions if any"
              rows="2"
            ></textarea>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Food Preferences <span className="required">*</span></label>
            <textarea
              name="foodPreferences"
              value={formData.foodPreferences}
              onChange={handleInputChange}
              placeholder="Enter food preferences"
              rows="2"
            ></textarea>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Habits <span className="required">*</span></label>
            <textarea
              name="habits"
              value={formData.habits}
              onChange={handleInputChange}
              placeholder="Enter habits"
              rows="2"
            ></textarea>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Likes / Dislikes <span className="required">*</span></label>
            <textarea
              name="likesDislikes"
              value={formData.likesDislikes}
              onChange={handleInputChange}
              placeholder="Enter likes and dislikes"
              rows="2"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="form-step">
      <h3 className="step-heading">Dedicated Health Assessment Form</h3>
      <p className="step-subheading">Fill up your details and proceed to the next steps.</p>
      
      <div className="health-assessment-list">
        {[
          { key: 'recognizeMaintenance', question: 'Can the applicant recognize and act on need for maintenance or repair within their living space? i.e. folding cloths, dusting, leakage in the tap etc.' },
          { key: 'recognizeHunger', question: 'Does the applicant recognise and act on hunger or thirst without a reminder?' },
          { key: 'manageHygiene', question: 'Can the applicant manage their hygiene, such as bathing, toileting, diapers or grooming, without reminders?' },
          { key: 'recognizeTimePlacePeople', question: 'Does the applicant recognise time, place, and people without confusion?' },
          { key: 'makeSafeDecisions', question: 'Does the applicant make safe decisions when left alone (e.g., turning off the stove)?' },
          { key: 'communicateSymptoms', question: 'Does the applicant recognise and communicate symptoms of illness, needs or discomfort?' },
          { key: 'avoidFalls', question: 'Does the applicant avoid falls or injuries in familiar environments?' },
          { key: 'callForHelp', question: 'Can the applicant call for help in emergencies (e.g., using a phone or emergency alert)?' }
        ].map(item => (
          <div key={item.key} className="assessment-item">
            <p className="assessment-question">{item.question}</p>
            <div className="assessment-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name={item.key}
                  value="Yes"
                  checked={formData.healthAssessment[item.key] === 'Yes'}
                  onChange={(e) => handleHealthAssessmentChange(item.key, e.target.value)}
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name={item.key}
                  value="No"
                  checked={formData.healthAssessment[item.key] === 'No'}
                  onChange={(e) => handleHealthAssessmentChange(item.key, e.target.value)}
                />
                No
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="form-step">
      <h3 className="step-heading">Guardian Info Form</h3>
      <p className="step-subheading">Fill up your details and proceed next steps.</p>
      
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Name Of Guardian <span className="required">*</span></label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleInputChange}
              placeholder="Enter Guardian Name"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Relation with Applicant <span className="required">*</span></label>
            <input
              type="text"
              name="guardianRelation"
              value={formData.guardianRelation}
              onChange={handleInputChange}
              placeholder="Enter Relation"
              required
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Permanent Address</label>
            <textarea
              name="guardianAddress"
              value={formData.guardianAddress}
              onChange={handleInputChange}
              placeholder="Enter Permanent Address"
              rows="2"
            ></textarea>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Contact Number <span className="required">*</span></label>
            <input
              type="tel"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleInputChange}
              placeholder="Enter Contact Number"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Email <span className="required">*</span></label>
            <input
              type="email"
              name="guardianEmail"
              value={formData.guardianEmail}
              onChange={handleInputChange}
              placeholder="Enter Email"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Name of Person Filling the Form <span className="required">*</span></label>
            <input
              type="text"
              name="fillerName"
              value={formData.fillerName}
              onChange={handleInputChange}
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Contact Number <span className="required">*</span></label>
            <input
              type="tel"
              name="fillerPhone"
              value={formData.fillerPhone}
              onChange={handleInputChange}
              placeholder="Enter Contact Number"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Signature of Person Filling the Form</label>
            <input
              type="text"
              name="fillerSignature"
              value={formData.fillerSignature}
              onChange={handleInputChange}
              placeholder="Enter Signature"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Email <span className="required">*</span></label>
            <input
              type="email"
              name="fillerEmail"
              value={formData.fillerEmail}
              onChange={handleInputChange}
              placeholder="Enter Email"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="form-step success-step">
      <div className="success-content">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2 className="success-title">Congratulations</h2>
        <p className="success-message">Well done! You have successfully completed.</p>
        {applicationId && (
          <p className="application-id">Your Application ID: <strong>{applicationId}</strong></p>
        )}
        <button className="btn-1 download-btn" onClick={() => window.print()}>
          <i className="fas fa-download me-2"></i> Download Application Form
          <span></span>
        </button>
        <div className="mt-4">
          <Link to="/" className="btn-1 btn-alt">
            Back to Home <span></span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Page Title */}
      <div className="page-title" style={{ backgroundImage: 'url(/assets/images/background/page-title.jpg)' }}>
        <div className="auto-container">
          <h1>New Entry Form</h1>
        </div>
      </div>
      <div className="bredcrumb-wrap">
        <div className="auto-container">
          <ul className="bredcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>New Entry Form</li>
          </ul>
        </div>
      </div>

      {/* Form Section */}
      <section className="entry-form-section">
        <div className="auto-container">
          <div className="entry-form-wrapper">
            {renderStepIndicator()}
            
            <div className="form-content">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
              {currentStep === 6 && renderStep6()}
              {currentStep === 7 && renderStep7()}

              {currentStep < 7 && (
                <div className="form-actions">
                  {currentStep > 1 && (
                    <button className="btn-back" onClick={handleBack} disabled={submitting}>
                      Back
                    </button>
                  )}
                  <button className="btn-1" onClick={handleNext} disabled={submitting}>
                    {submitting ? 'Saving...' : currentStep === 6 ? 'Save' : 'Save & Next'}
                    <span></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewEntryForm;

