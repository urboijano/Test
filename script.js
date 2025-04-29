        const dashboardBtn = document.getElementById("dashboardBtn");
        const homeBtn = document.getElementById("homeBtn");
        const patientIndexBtn = document.getElementById("patientIndexBtn");
        const registrationBtn = document.getElementById("registrationBtn");
        const medicalBtn = document.getElementById("medicalBtn");
        const healthBtn = document.getElementById("healthBtn");
        const vitalBtn = document.getElementById("vitalBtn");
        const labBtn = document.getElementById("labBtn");
        const marBtn = document.getElementById("marBtn");
        const cdssBtn = document.getElementById("cdssBtn");
        const followUpBtn = document.getElementById("followUpBtn");
        const consentFormBtn = document.getElementById("consentFormBtn");
        const billingsBtn = document.getElementById("billingsBtn");
        const content = document.getElementById("content");
        const navbarButtons = document.getElementById("navbarButtons");

        function setActiveButtons(...buttons) {

            const allButtons = [

                dashboardBtn, registrationBtn, homeBtn, patientIndexBtn,

                medicalBtn, healthBtn, vitalBtn, labBtn,

                marBtn, cdssBtn, followUpBtn, consentFormBtn, billingsBtn

            ];

            

            // Reset all buttons to inactive state

            allButtons.forEach(btn => {

                // Reset styles for all buttons

                btn.classList.remove("bg-white", "text-blue-900", "text-blue-700");

                btn.classList.add("bg-blue-900", "text-white");

            });


            // Activate the selected buttons

            buttons.forEach((btn) => {

                if (btn === homeBtn || btn === patientIndexBtn) {

                    // Set Home and Patient Index buttons to active styles

                    btn.classList.add("bg-white", "text-blue-700");

                    btn.classList.remove("text-gray-700");

                } else {

                    // Set other buttons to active styles

                    btn.classList.add("bg-white", "text-blue-900");

                    btn.classList.remove("text-white");

                }

            });


            // Ensure Home and Patient Index buttons have a white background when inactive

            if (!buttons.includes(homeBtn)) {

                homeBtn.classList.add("bg-white");

                homeBtn.classList.remove("bg-blue-900", "text-white");

            }

            if (!buttons.includes(patientIndexBtn)) {

                patientIndexBtn.classList.add("bg-white");

                patientIndexBtn.classList.remove("bg-blue-900", "text-white");

            }

        }

        function showHome() {
            content.innerHTML = `
                <h2 class="text-5xl md:text-7xl font-bold text-black relative z-10">
                    Welcome to Everrest Hospital!
                </h2>
                <img src="2.png" class="absolute inset-0 w-full h-full object-cover opacity-50" alt="Hospital Background">
            `;
            setActiveButtons(dashboardBtn, homeBtn);
            navbarButtons.style.display = 'flex'; // Show navbar buttons
            document.querySelector("main").classList.remove("overflow-auto"); // Disable scrolling
            document.querySelector("span.text-gray-600").style.display = "inline"; // Show Gmail
            document.querySelector("header").classList.remove("justify-end"); // Reset layout
        }
        
        function showPatientIndex() {
            const patients = JSON.parse(localStorage.getItem("patients")) || [];
        
            content.innerHTML = `
                <div class="absolute top-4 left-4 flex items-center space-x-2">
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
                        </svg>
                        <input type="text" id="searchInput" placeholder="Search..."
                            class="p-3 pl-10 border border-blue-900 rounded-full w-64 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>
        
                <div class="w-full p-2 mt-2 relative">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-gray-100 border-b border-blue-900">
                                <th class="p-3 text-center">Registration No.</th>
                                <th class="p-3 text-center">Name</th>
                                <th class="p-3 text-center">Date of Birth</th>
                                <th class="p-3 text-center">Admission Date</th>
                            </tr>
                        </thead>
                        <tbody id="patientTable">
                            ${patients.map(p => `
                                <tr class="border-b border-blue-900 hover:font-bold hover:text-blue-700 hover:underline cursor-pointer" data-reg="${p.registrationNumber}">
                                    <td class="p-3 text-center">${p.registrationNumber}</td>
                                    <td class="p-3 text-center">${p.name}</td>
                                    <td class="p-3 text-center">${p.dob}</td>
                                    <td class="p-3 text-center">${p.admissionDate}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        
            // Search functionality
            const searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("input", function () {
                const searchValue = searchInput.value.toLowerCase();
                const rows = document.querySelectorAll("#patientTable tr");
        
                rows.forEach(row => {
                    const regNo = row.cells[0].textContent.toLowerCase();
                    const name = row.cells[1].textContent.toLowerCase();
                    row.style.display = (regNo.includes(searchValue) || name.includes(searchValue)) ? "" : "none";
                });
            });
        
            // Load updated data when a row is clicked
            document.querySelectorAll("#patientTable tr").forEach(row => {
                row.addEventListener("click", () => {
                    const regNo = row.getAttribute("data-reg");
                    const latestPatients = JSON.parse(localStorage.getItem("patients")) || [];
                    const patient = latestPatients.find(p => p.registrationNumber === regNo);
                    if (patient) {
                        showRegistration(patient);
                    } else {
                        alert("Patient not found in storage.");
                    }
                });
            });
        
            setActiveButtons(patientIndexBtn, dashboardBtn);
        }
        
        const submittedPatients = [];

        function showRegistration(patientData = {}) {
            content.innerHTML = `
                <div class="p-4 bg-gray rounded-lg shadow-md h-[100vh] w-full overflow-y-auto">
                    <div class="mb-6">
                        <h3 class="text-5xl font-semibold text-blue-900 mb-4">Patient Information</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Patient's Name</label>
                                <input type="text" id="patientName" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Date of Birth</label>
                                <input type="date" id="dob" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Age</label>
                                <input type="number" id="age" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Sex</label>
                                <select id="sex" class="border border-blue-700 p-2 rounded w-full">
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Civil Status</label>
                                <input type="text" id="civilStatus" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Religion</label>
                                <input type="text" id="religion" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Current Address</label>
                                <input type="text" id="currentAddress" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Place of Birth</label>
                                <input type="text" id="placeOfBirth" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Contact No. (Mobile)</label>
                                <input type="text" id="contactNo" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Emergency Contact</label>
                                <input type="text" id="emergencyContact" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Relationship to Patient</label>
                                <input type="text" id="relationshipToPatient" class="border border-blue-700 p-2 rounded w-full">
                            </div>
                        </div>
                    </div>
        
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="bg-gray-100 p-4 rounded-lg">
                            <h3 class="text-5xl font-semibold text-blue-900 mb-4">Hospital Details</h3>
                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Registration Number</label>
                                    <input type="text" id="registrationNumber" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Admission Date</label>
                                    <input type="date" id="admissionDate" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Room Number</label>
                                    <input type="text" id="roomNumber" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Bed Number</label>
                                    <input type="text" id="bedNumber" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Admission Time</label>
                                    <input type="time" id="admissionTime" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Attending Physician</label>
                                    <input type="text" id="attendingPhysician" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                            </div>
                        </div>
        
                        <div class="bg-gray-100 p-4 rounded-lg">
                            <h3 class="text-5xl font-semibold text-blue-900 mb-4">Medical Information</h3>
                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Chief Complaint</label>
                                    <input type="text" id="chiefComplaint" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Admitting Diagnosis</label>
                                    <input type="text" id="admittingDiagnosis" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Other Diagnoses</label>
                                    <input type="text" id="otherDiagnoses" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                                <div>
                                    <label class="block text-blue-900 text-sm font-medium">Allergies</label>
                                    <input type="text" id="allergies" class="border border-blue-700 p-2 rounded w-full">
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="flex flex-col items-end mt-4 space-y-2">
                        <button id="updateButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">Update</button>
                        <button id="submitButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">Submit Credentials</button>
                    </div>
                    <div class="h-20"></div>
                </div>
            `;
        
            // Pre-fill all fields from patientData
            document.getElementById("registrationNumber").value = patientData.registrationNumber || "";
            document.getElementById("patientName").value = patientData.name || "";
            document.getElementById("dob").value = formatDateForInput(patientData.dob) || "";
            document.getElementById("admissionDate").value = formatDateForInput(patientData.admissionDate) || "";
        
            document.getElementById("age").value = patientData.age || "";
            document.getElementById("sex").value = patientData.sex || "";
            document.getElementById("civilStatus").value = patientData.civilStatus || "";
            document.getElementById("religion").value = patientData.religion || "";
            document.getElementById("currentAddress").value = patientData.currentAddress || "";
            document.getElementById("placeOfBirth").value = patientData.placeOfBirth || "";
            document.getElementById("contactNo").value = patientData.contactNo || "";
            document.getElementById("emergencyContact").value = patientData.emergencyContact || "";
            document.getElementById("relationshipToPatient").value = patientData.relationshipToPatient || "";
            document.getElementById("roomNumber").value = patientData.roomNumber || "";
            document.getElementById("bedNumber").value = patientData.bedNumber || "";
            document.getElementById("admissionTime").value = patientData.admissionTime || "";
            document.getElementById("attendingPhysician").value = patientData.attendingPhysician || "";
            document.getElementById("chiefComplaint").value = patientData.chiefComplaint || "";
            document.getElementById("admittingDiagnosis").value = patientData.admittingDiagnosis || "";
            document.getElementById("otherDiagnoses").value = patientData.otherDiagnoses || "";
            document.getElementById("allergies").value = patientData.allergies || "";
        
            // Submit & Update logic remains unchanged
            document.getElementById("updateButton").addEventListener("click", () => {
                const updatedData = {
                    name: document.getElementById("patientName").value,
                    dob: document.getElementById("dob").value,
                    age: document.getElementById("age").value,
                    sex: document.getElementById("sex").value,
                    civilStatus: document.getElementById("civilStatus").value,
                    religion: document.getElementById("religion").value,
                    currentAddress: document.getElementById("currentAddress").value,
                    placeOfBirth: document.getElementById("placeOfBirth").value,
                    contactNo: document.getElementById("contactNo").value,
                    emergencyContact: document.getElementById("emergencyContact").value,
                    relationshipToPatient: document.getElementById("relationshipToPatient").value,
                    registrationNumber: document.getElementById("registrationNumber").value,
                    admissionDate: document.getElementById("admissionDate").value,
                    roomNumber: document.getElementById("roomNumber").value,
                    bedNumber: document.getElementById("bedNumber").value,
                    admissionTime: document.getElementById("admissionTime").value,
                    attendingPhysician: document.getElementById("attendingPhysician").value,
                    chiefComplaint: document.getElementById("chiefComplaint").value,
                    admittingDiagnosis: document.getElementById("admittingDiagnosis").value,
                    otherDiagnoses: document.getElementById("otherDiagnoses").value,
                    allergies: document.getElementById("allergies").value,
                };
        
                let savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
        
                const index = savedPatients.findIndex(p => p.registrationNumber === updatedData.registrationNumber);
                if (index !== -1) {
                    savedPatients[index] = updatedData;
                    localStorage.setItem("patients", JSON.stringify(savedPatients));
                    alert("Patient information updated!");
                } else {
                    alert("Patient not found. Please submit first.");
                }
            });
        
            document.getElementById("submitButton").addEventListener("click", () => {
                const formData = {
                    id: Date.now(), // Unique ID assigned here
                    name: document.getElementById("patientName").value,
                    dob: document.getElementById("dob").value,
                    age: document.getElementById("age").value,
                    sex: document.getElementById("sex").value,
                    civilStatus: document.getElementById("civilStatus").value,
                    religion: document.getElementById("religion").value,
                    currentAddress: document.getElementById("currentAddress").value,
                    placeOfBirth: document.getElementById("placeOfBirth").value,
                    contactNo: document.getElementById("contactNo").value,
                    emergencyContact: document.getElementById("emergencyContact").value,
                    relationshipToPatient: document.getElementById("relationshipToPatient").value,
                    registrationNumber: document.getElementById("registrationNumber").value,
                    admissionDate: document.getElementById("admissionDate").value,
                    roomNumber: document.getElementById("roomNumber").value,
                    bedNumber: document.getElementById("bedNumber").value,
                    admissionTime: document.getElementById("admissionTime").value,
                    attendingPhysician: document.getElementById("attendingPhysician").value,
                    chiefComplaint: document.getElementById("chiefComplaint").value,
                    admittingDiagnosis: document.getElementById("admittingDiagnosis").value,
                    otherDiagnoses: document.getElementById("otherDiagnoses").value,
                    allergies: document.getElementById("allergies").value,
                    credentials: []
                };
        
                let savedPatients = JSON.parse(localStorage.getItem("patients")) || [];
        
                const existing = savedPatients.find(p => p.registrationNumber === formData.registrationNumber);
                if (existing) {
                    alert("Patient already exists. Use Update to modify.");
                    return;
                }
        
                savedPatients.push(formData);
                localStorage.setItem("patients", JSON.stringify(savedPatients));
                alert("Patient registration submitted!");
            });
        
            setActiveButtons(registrationBtn);
        }
        
        function loadPatient(registrationNumber) {
            const patients = JSON.parse(localStorage.getItem("patients")) || [];
            const patient = patients.find(p => p.registrationNumber === registrationNumber);
            if (patient) {
                showRegistration(patient);
            } else {
                alert("Patient not found.");
            }
        }
        
        function formatDateForInput(dateStr) {
            if (!dateStr) return "";
        
            // If already in YYYY-MM-DD format
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        
            // If in MM-DD-YYYY or M-D-YYYY format
            const parts = dateStr.split("-");
            if (parts.length === 3) {
                let [month, day, year] = parts;
                month = month.padStart(2, '0');
                day = day.padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            return "";
        }
        
        
        
                        
        // Add additional functions for new buttons
        function showMedicalHistory() {
            const content = document.getElementById('content');
            content.innerHTML = `
                <div class="p-4 bg-gray rounded-lg shadow-md h-[100vh] w-full overflow-y-auto">
                    <!-- History of Present Illness -->
                    <div class="mb-6">
                        <h3 class="text-2xl font-bold text-blue-900 mb-4">History of Present Illness</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" id="onset" placeholder="Onset" class="border border-blue-700 p-2 rounded-md w-full">
                            <input type="text" id="aggravatingFactors" placeholder="Aggravating Factors" class="border border-blue-700 p-2 rounded-md w-full">
                            <input type="text" id="location" placeholder="Location" class="border border-blue-700 p-2 rounded-md w-full">
                            <input type="text" id="relievingFactors" placeholder="Relieving Factors" class="border border-blue-700 p-2 rounded-md w-full">
                            <input type="text" id="duration" placeholder="Duration" class="border border-blue-700 p-2 rounded-md w-full">
                        </div>
                    </div>
        
                    <!-- Past Health History -->
                    <div class="mb-6">
                        <h3 class="text-2xl font-bold text-blue-900 mb-4">Past Health History</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <!-- Hospitalizations -->
                            <div>
                                <label class="block text-blue-900 font-semibold mb-2">Hospitalizations</label>
                                <div class="grid grid-cols-2 gap-2">
                                    ${generateInputFields(5, "Hospitalization Details")}
                                </div>
                            </div>
        
                            <!-- Surgeries -->
                            <div>
                                <label class="block text-blue-900 font-semibold mb-2">Surgeries</label>
                                <div class="grid grid-cols-2 gap-2">
                                    ${generateInputFields(5, "Surgery Details")}
                                </div>
                            </div>
        
                            <!-- Accidents -->
                            <div>
                                <label class="block text-blue-900 font-semibold mb-2">Accidents</label>
                                <div class="grid grid-cols-2 gap-2">
                                    ${generateInputFields(5, "Accident Details")}
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <!-- Immunization & Existing Conditions -->
                    <div class="mb-6">
                        <div class="grid grid-cols-2 gap-6">
                            <!-- Immunization -->
                            <div>
                                <h3 class="text-2xl font-bold text-blue-900 mb-4">Immunization</h3>
                                <div class="grid grid-cols-2 gap-2 items-center">
                                    <label class="text-blue-900">Flu</label>
                                    <input type="date" id="fluDate" class="border border-blue-900 p-2 rounded-md w-full">
                                    <label class="text-blue-900">DTaP</label>
                                    <input type="date" id="dtapDate" class="border border-blue-900 p-2 rounded-md w-full">
                                    <label class="text-blue-900">Pneumonia</label>
                                    <input type="date" id="pneumoniaDate" class="border border-blue-900 p-2 rounded-md w-full">
                                    <label class="text-blue-900">Hepa A</label>
                                    <input type="date" id="hepaADate" class="border border-blue-900 p-2 rounded-md w-full">
                                    <label class="text-blue-900">Hepa B</label>
                                    <input type="date" id="hepaBDate" class="border border-blue-900 p-2 rounded-md w-full">
                                </div>
                                <div class="mt-4">
                                    <label class="text-blue-900 italic">Others (please specify)</label>
                                    ${generateVaccineFields(5)}
                                </div>
                            </div>
        
                            <!-- Existing Conditions -->
                            <div>
                                <h3 class="text-2xl font-bold text-blue-900 mb-4">Existing Conditions</h3>
                                <div class="grid grid-cols-2 gap-4 text-blue-900">
                                    <label><input type="checkbox" class="mr-2"> High blood pressure</label>
                                    <label><input type="checkbox" class="mr-2"> Heart disease</label>
                                    <label><input type="checkbox" class="mr-2"> Stroke</label>
                                    <label><input type="checkbox" class="mr-2"> Diabetes</label>
                                    <label><input type="checkbox" class="mr-2"> Anemia</label>
                                    <label><input type="checkbox" class="mr-2"> Chronic Obstructive Pulmonary Disease</label>
                                    <label><input type="checkbox" class="mr-2"> Thyroid Disorder</label>
                                    <label><input type="checkbox" class="mr-2"> Depression or Anxiety</label>
                                    <label><input type="checkbox" class="mr-2"> Cancer</label>
                                    <label><input type="checkbox" class="mr-2"> Autoimmune Disease</label>
                                </div>
                                <div class="mt-4">
                                    <label class="text-blue-900 italic">Others (please specify)</label>
                                    <div class="grid grid-cols-2 gap-4">
                                        ${generateCheckboxFields(5)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <!-- Lifestyle -->
                    <div class="mb-6">
                        <h3 class="text-2xl font-bold text-blue-900 mb-4">Lifestyle</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <!-- Nutrition -->
                            <div>
                                <h4 class="text-xl font-semibold text-blue-900">Nutrition</h4>
                                <div class="flex items-center justify-between">
                                    <span>Diet:</span>
                                    <input type="text" id="diet" class="border border-blue-900 p-2 rounded-md w-3/4">
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Fluids:</span>
                                    <input type="text" id="fluids" class="border border-blue-900 p-2 rounded-md w-3/4">
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Recent Weight Change:</span>
                                    <input type="checkbox" id="recentWeightChange">
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Supplements:</span>
                                    <input type="checkbox" id="supplements">
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Conditions affecting eating:</span>
                                    <input type="checkbox" id="conditionsAffectingEating">
                                </div>
                            </div>
                            <div>
                                <h5 class="text-lg font-semibold text-blue-900">Comments:</h5>
                                <textarea id="nutritionComments" class="border border-blue-900 p-2 rounded-md w-full h-24"></textarea>
                            </div>
        
                            <!-- Elimination -->
                            <div>
                                <h4 class="text-xl font-semibold text-blue-900">Elimination</h4>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Bladder Incontinence:</span>
                                    <input type="checkbox" id="bladderIncontinence">
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Bowel Incontinence:</span>
                                    <input type="checkbox" id="bowelIncontinence">
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Bowel Sounds Present:</span>
                                    <input type="checkbox" id="bowelSoundsPresent">
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Constipation:</span>
                                    <input type="checkbox" id="constipation">
                                </div>
                            </div>
                            <div>
                                <h5 class="text-lg font-semibold text-blue-900">Comments:</h5>
                                <textarea id="eliminationComments" class="border border-blue-900 p-2 rounded-md w-full h-24"></textarea>
                            </div>
        
                            <!-- Sensory -->
                            <div>
                                <h4 class="text-xl font-semibold text-blue-900">Sensory</h4>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Vision:</span>
                                    <div>
                                        <input type="checkbox" id="visionNormal"> Normal
                                        <input type="checkbox" id="visionImpaired"> Impaired
                                        <input type="checkbox" id="visionCorrectiveDevice"> Corrective Device
                                    </div>
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <span>Hearing:</span>
                                    <div>
                                        <input type="checkbox" id="hearingNormal"> Normal
                                        <input type="checkbox" id="hearingImpaired"> Impaired
                                        <input type="checkbox" id="hearingCorrectiveDevice"> Corrective Device
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5 class="text-lg font-semibold text-blue-900">Comments:</h5>
                                <textarea id="sensoryComments" class="border border-blue-900 p-2 rounded-md w-full h-24"></textarea>
                            </div>
                        </div>
                    </div>
        
                    <!-- Allergies and Current Medications -->
                    <div class="grid grid-cols-2 gap-6 mb-6">
                        <!-- Allergies -->
                        <div>
                            <h3 class="text-2xl font-bold text-blue-900 mb-4">Allergies</h3>
                            <div class="grid grid-cols-3 gap-2">
                                <label><input type="checkbox" id="allergyFood"> Food</label>
                                <input type="text" id="allergyFoodType" placeholder="Kind or Type" class="border border-blue-900 p-2 rounded-md w-full">
                                <input type="text" id="allergyFoodReactions" placeholder="Reactions" class="border border-blue-900 p-2 rounded-md w-full">
        
                                <label><input type="checkbox" id="allergyMedicine"> Medicine</label>
                                <input type="text" id="allergyMedicineType" placeholder="Kind or Type" class="border border-blue-900 p-2 rounded-md w-full">
                                <input type="text" id="allergyMedicineReactions" placeholder="Reactions" class="border border-blue-900 p-2 rounded-md w-full">
        
                                <label><input type="checkbox" id="allergyLatex"> Latex</label>
                                <input type="text" id="allergyLatexType" placeholder="Kind or Type" class="border border-blue-900 p-2 rounded-md w-full">
                                <input type="text" id="allergyLatexReactions" placeholder="Reactions" class="border border-blue-900 p-2 rounded-md w-full">
        
                                <label><input type="checkbox" id="allergyEnvironment"> Environment</label>
                                <input type="text" id="allergyEnvironmentType" placeholder="Kind or Type" class="border border-blue-900 p-2 rounded-md w-full">
                                <input type="text" id="allergyEnvironmentReactions" placeholder="Reactions" class="border border-blue-900 p-2 rounded-md w-full">
                            </div>
                        </div>
        
                        <!-- Current Medications -->
                        <div>
                            <h3 class="text-2xl font-bold text-blue-900 mb-4">Current Medications</h3>
                            <div class="grid grid-cols-1 gap-2">
                                <input type="text" id="medication1" class="border border-blue-900 p-2 rounded-md w-full" placeholder="Medication Name">
                                <input type="text" id="medication2" class="border border-blue-900 p-2 rounded-md w-full" placeholder="Medication Name">
                                <input type="text" id="medication3" class="border border-blue-900 p-2 rounded-md w-full" placeholder="Medication Name">
                                <input type="text" id="medication4" class="border border-blue-900 p-2 rounded-md w-full" placeholder="Medication Name">
                                <input type="text" id="medication5" class="border border-blue-900 p-2 rounded-md w-full" placeholder="Medication Name">
                            </div>
                        </div>
                    </div>
        
                    <!-- Family Medical History -->
                    <div class="mb-6">
                        <h3 class="text-2xl font-bold text-blue-900 mb-4">Family Medical History</h3>
                        <table class="w-full border border-blue-900">
                            <thead>
                                <tr class="text-blue-900">
                                    <th class="border border-blue-900 p-2">Relation</th>
                                    <th class="border border-blue-900 p-2">Age if Living</th>
                                    <th class="border border-blue-900 p-2">Age at Death</th>
                                    <th class="border border-blue-900 p-2">Present Condition</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border border-blue-900 p-2 text-blue-900">Father</td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="fatherAgeLiving" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="fatherAgeDeath" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="fatherCondition" class="w-full border p-2 rounded-md"></td>
                                </tr>
                                <tr>
                                    <td class="border border-blue-900 p-2 text-blue-900">Mother</td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="motherAgeLiving" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="motherAgeDeath" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="motherCondition" class="w-full border p-2 rounded-md"></td>
                                </tr>
                                <tr>
                                    <td class="border border-blue-900 p-2 text-blue-900">Siblings</td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="siblingsAgeLiving" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="siblingsAgeDeath" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" id="siblingsCondition" class="w-full border p-2 rounded-md"></td>
                                </tr>
                                <tr>
                                    <td class="border border-blue-900 p-2 text-blue-900"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                </tr>
                                <tr>
                                    <td class="border border-blue-900 p-2 text-blue-900"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                </tr>
                                <tr>
                                    <td class="border border-blue-900 p-2 text-blue-900"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                    <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex flex-col items-end mt-4 space-y-2">
                        <button id="medicalSubmitButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">Submit Credentials</button>
                        <button id="medicalSummaryButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">View Patient History</button>
                    </div>
        
                    <div class="h-20"></div> <!-- Added space at the bottom -->
                </div>
        
                <!-- Patient List Modal Structure -->
                <div id="patientListModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white rounded-lg shadow-lg w-80 max-h-[80vh] overflow-y-auto p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-2xl font-bold text-blue-900">Select Patient</h3>
                            <button id="closePatientListModal" class="text-black text-2xl font-bold">&times;</button>
                        </div>
                        <ul id="patientList" class="space-y-2"></ul>
                    </div>
                </div>
        
                <!-- View Patient History Modal Structure -->
                <div id="viewHistoryModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto flex relative">
                        <button id="closeViewHistoryModal" class="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
                        <!-- Patient List -->
                        <div class="w-full p-4 border-r border-gray-300 overflow-y-auto">
                            <h3 class="text-2xl font-bold text-blue-900 mb-4">Patients</h3>
                            <ul id="historyPatientList"></ul>
                        </div>
                        <!-- Summary Content -->
                        <div class="w-full p-4 overflow-y-auto hidden" id="summaryModalContent">
                            <div id="summaryContent"></div>
                        </div>
                    </div>
                </div>
            `;
        
            setActiveButtons(medicalBtn);
        
            // Load saved data from local storage
            const savedData = JSON.parse(localStorage.getItem("medicalHistoryData")) || {};
            Object.keys(savedData).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    if (element.type === "checkbox") {
                        element.checked = savedData[key];
                    } else {
                        element.value = savedData[key];
                    }
                }
            });
        
            document.getElementById("medicalSubmitButton").addEventListener("click", function() {
                const patients = JSON.parse(localStorage.getItem("patients")) || [];
                const patientListContainer = document.getElementById("patientList");
                patientListContainer.innerHTML = ""; // Clear any previous list
        
                if (patients.length > 0) {
                    patients.forEach(patient => {
                        const listItem = document.createElement("li");
                        listItem.textContent = patient.name;
                        listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline", "p-2", "border-b", "border-gray-200");
                        listItem.addEventListener("click", () => {
                            alert(`Credentials submitted to ${patient.name}`);
                            savePatientCredentials(patient);
                            document.getElementById("patientListModal").classList.add("hidden");
                        });
                        patientListContainer.appendChild(listItem);
                    });
                } else {
                    patientListContainer.innerHTML = "<p>No patients found.</p>";
                }
        
                // Show the modal
                document.getElementById("patientListModal").classList.remove("hidden");
            });
        
            document.getElementById("medicalSummaryButton").addEventListener("click", function() {
                const patients = JSON.parse(localStorage.getItem("patients")) || [];
                const patientListContainer = document.getElementById("historyPatientList");
                patientListContainer.innerHTML = ""; // Clear any previous list
        
                if (patients.length > 0) {
                    patients.forEach(patient => {
                        const listItem = document.createElement("li");
                        listItem.textContent = patient.name;
                        listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline", "p-2", "border-b", "border-gray-200");
                        listItem.addEventListener("click", () => togglePatientSummary(patient));
                        patientListContainer.appendChild(listItem);
                    });
                } else {
                    patientListContainer.innerHTML = "<p>No patients found.</p>";
                }
        
                // Show the patient list modal first
                document.getElementById("viewHistoryModal").classList.remove("hidden");
                document.querySelector("#viewHistoryModal .w-full.p-4.border-r").classList.remove("hidden");
                document.getElementById("summaryModalContent").classList.add("hidden");
            });
        
            document.getElementById("closePatientListModal").addEventListener("click", function() {
                // Hide the modal
                document.getElementById("patientListModal").classList.add("hidden");
            });
        
            document.getElementById("closeViewHistoryModal").addEventListener("click", function() {
                // Hide the modal
                document.getElementById("viewHistoryModal").classList.add("hidden");
            });
        
            // Function to save patient credentials
            function savePatientCredentials(patient) {
                // Collect all input values from the main form
                const data = {
                    onset: document.getElementById("onset").value,
                    aggravatingFactors: document.getElementById("aggravatingFactors").value,
                    location: document.getElementById("location").value,
                    relievingFactors: document.getElementById("relievingFactors").value,
                    duration: document.getElementById("duration").value,
                    fluDate: document.getElementById("fluDate").value,
                    dtapDate: document.getElementById("dtapDate").value,
                    pneumoniaDate: document.getElementById("pneumoniaDate").value,
                    hepaADate: document.getElementById("hepaADate").value,
                    hepaBDate: document.getElementById("hepaBDate").value,
                    diet: document.getElementById("diet").value,
                    fluids: document.getElementById("fluids").value,
                    recentWeightChange: document.getElementById("recentWeightChange").checked,
                    supplements: document.getElementById("supplements").checked,
                    conditionsAffectingEating: document.getElementById("conditionsAffectingEating").checked,
                    nutritionComments: document.getElementById("nutritionComments").value,
                    bladderIncontinence: document.getElementById("bladderIncontinence").checked,
                    bowelIncontinence: document.getElementById("bowelIncontinence").checked,
                    bowelSoundsPresent: document.getElementById("bowelSoundsPresent").checked,
                    constipation: document.getElementById("constipation").checked,
                    eliminationComments: document.getElementById("eliminationComments").value,
                    visionNormal: document.getElementById("visionNormal").checked,
                    visionImpaired: document.getElementById("visionImpaired").checked,
                    visionCorrectiveDevice: document.getElementById("visionCorrectiveDevice").checked,
                    hearingNormal: document.getElementById("hearingNormal").checked,
                    hearingImpaired: document.getElementById("hearingImpaired").checked,
                    hearingCorrectiveDevice: document.getElementById("hearingCorrectiveDevice").checked,
                    sensoryComments: document.getElementById("sensoryComments").value,
                    allergyFood: document.getElementById("allergyFood").checked,
                    allergyFoodType: document.getElementById("allergyFoodType").value,
                    allergyFoodReactions: document.getElementById("allergyFoodReactions").value,
                    allergyMedicine: document.getElementById("allergyMedicine").checked,
                    allergyMedicineType: document.getElementById("allergyMedicineType").value,
                    allergyMedicineReactions: document.getElementById("allergyMedicineReactions").value,
                    allergyLatex: document.getElementById("allergyLatex").checked,
                    allergyLatexType: document.getElementById("allergyLatexType").value,
                    allergyLatexReactions: document.getElementById("allergyLatexReactions").value,
                    allergyEnvironment: document.getElementById("allergyEnvironment").checked,
                    allergyEnvironmentType: document.getElementById("allergyEnvironmentType").value,
                    allergyEnvironmentReactions: document.getElementById("allergyEnvironmentReactions").value,
                    medication1: document.getElementById("medication1").value,
                    medication2: document.getElementById("medication2").value,
                    medication3: document.getElementById("medication3").value,
                    medication4: document.getElementById("medication4").value,
                    medication5: document.getElementById("medication5").value,
                    fatherAgeLiving: document.getElementById("fatherAgeLiving").value,
                    fatherAgeDeath: document.getElementById("fatherAgeDeath").value,
                    fatherCondition: document.getElementById("fatherCondition").value,
                    motherAgeLiving: document.getElementById("motherAgeLiving").value,
                    motherAgeDeath: document.getElementById("motherAgeDeath").value,
                    motherCondition: document.getElementById("motherCondition").value,
                    siblingsAgeLiving: document.getElementById("siblingsAgeLiving").value,
                    siblingsAgeDeath: document.getElementById("siblingsAgeDeath").value,
                    siblingsCondition: document.getElementById("siblingsCondition").value,
                };
        
                // Save data to local storage specific to the patient
                const patientDataKey = `medicalHistoryData_${patient.id}`;
                localStorage.setItem(patientDataKey, JSON.stringify(data));
            }
        
            // Function to toggle patient summary
            function togglePatientSummary(patient) {
                const summaryModalContent = document.getElementById("summaryModalContent");
                if (summaryModalContent.classList.contains("hidden")) {
                    // Retrieve saved data from local storage specific to the patient
                    const patientDataKey = `medicalHistoryData_${patient.id}`;
                    const data = JSON.parse(localStorage.getItem(patientDataKey)) || {};
        
                    // Generate the summary content
                    const summaryContent = generateSummaryContent(patient, data);
        
                    // Populate the summary modal content
                    summaryModalContent.innerHTML = summaryContent;
        
                    // Show the summary content
                    summaryModalContent.classList.remove("hidden");
                    document.querySelector("#viewHistoryModal .w-full.p-4.border-r").classList.add("hidden");
                } else {
                    // Hide the summary content and show the patient list
                    summaryModalContent.classList.add("hidden");
                    document.querySelector("#viewHistoryModal .w-full.p-4.border-r").classList.remove("hidden");
                }
            }
        
            function generateSummaryContent(patient, data) {
                return `
                    <div class="p-4 bg-gray rounded-lg shadow-md h-full w-full overflow-y-auto">
                        <h3 class="text-2xl font-bold text-blue-900 mb-4">Patient Summary for ${patient.name}</h3>
                        <div class="mb-6">
                            <h4 class="text-xl font-semibold text-blue-900 mb-2">History of Present Illness</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-blue-900">Onset</label>
                                    <input type="text" value="${data.onset || ''}" class="border border-blue-700 p-2 rounded-md w-full" readonly>
                                </div>
                                <div>
                                    <label class="text-blue-900">Aggravating Factors</label>
                                    <input type="text" value="${data.aggravatingFactors || ''}" class="border border-blue-700 p-2 rounded-md w-full" readonly>
                                </div>
                                <div>
                                    <label class="text-blue-900">Location</label>
                                    <input type="text" value="${data.location || ''}" class="border border-blue-700 p-2 rounded-md w-full" readonly>
                                </div>
                                <div>
                                    <label class="text-blue-900">Relieving Factors</label>
                                    <input type="text" value="${data.relievingFactors || ''}" class="border border-blue-700 p-2 rounded-md w-full" readonly>
                                </div>
                                <div>
                                    <label class="text-blue-900">Duration</label>
                                    <input type="text" value="${data.duration || ''}" class="border border-blue-700 p-2 rounded-md w-full" readonly>
                                </div>
                            </div>
                        </div>
        
                        <!-- Immunization -->
                        <div class="mb-6">
                            <h4 class="text-xl font-semibold text-blue-900 mb-2">Immunization</h4>
                            <div class="grid grid-cols-2 gap-2 items-center">
                                <div>
                                    <label class="text-blue-900">Flu Date</label>
                                    <input type="date" value="${data.fluDate || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                </div>
                                <div>
                                    <label class="text-blue-900">DTaP Date</label>
                                    <input type="date" value="${data.dtapDate || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                </div>
                                <div>
                                    <label class="text-blue-900">Pneumonia Date</label>
                                    <input type="date" value="${data.pneumoniaDate || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                </div>
                                <div>
                                    <label class="text-blue-900">Hepa A Date</label>
                                    <input type="date" value="${data.hepaADate || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                </div>
                                <div>
                                    <label class="text-blue-900">Hepa B Date</label>
                                    <input type="date" value="${data.hepaBDate || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                </div>
                            </div>
                        </div>
        
                        <!-- Lifestyle -->
                        <div class="mb-6">
                            <h4 class="text-xl font-semibold text-blue-900 mb-2">Lifestyle</h4>
                            <div class="grid grid-cols-2 gap-6">
                                <!-- Nutrition -->
                                <div>
                                    <h5 class="text-lg font-semibold text-blue-900">Nutrition</h5>
                                    <div class="flex items-center justify-between">
                                        <span>Diet:</span>
                                        <input type="text" value="${data.diet || ''}" class="border border-blue-900 p-2 rounded-md w-3/4" readonly>
                                    </div>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Fluids:</span>
                                        <input type="text" value="${data.fluids || ''}" class="border border-blue-900 p-2 rounded-md w-3/4" readonly>
                                    </div>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Recent Weight Change:</span>
                                        <input type="checkbox" ${data.recentWeightChange ? 'checked' : ''} disabled>
                                    </div>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Supplements:</span>
                                        <input type="checkbox" ${data.supplements ? 'checked' : ''} disabled>
                                    </div>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Conditions affecting eating:</span>
                                        <input type="checkbox" ${data.conditionsAffectingEating ? 'checked' : ''} disabled>
                                    </div>
                                </div>
                                <div>
                                    <h5 class="text-lg font-semibold text-blue-900">Comments:</h5>
                                    <textarea class="border border-blue-900 p-2 rounded-md w-full h-24" readonly>${data.nutritionComments || ''}</textarea>
                                </div>
        
                                <!-- Elimination -->
                                <div>
                                    <h5 class="text-lg font-semibold text-blue-900">Elimination</h5>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Bladder Incontinence:</span>
                                        <input type="checkbox" ${data.bladderIncontinence ? 'checked' : ''} disabled>
                                    </div>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Bowel Incontinence:</span>
                                        <input type="checkbox" ${data.bowelIncontinence ? 'checked' : ''} disabled>
                                    </div>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Bowel Sounds Present:</span>
                                        <input type="checkbox" ${data.bowelSoundsPresent ? 'checked' : ''} disabled>
                                    </div>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Constipation:</span>
                                        <input type="checkbox" ${data.constipation ? 'checked' : ''} disabled>
                                    </div>
                                </div>
                                <div>
                                    <h5 class="text-lg font-semibold text-blue-900">Comments:</h5>
                                    <textarea class="border border-blue-900 p-2 rounded-md w-full h-24" readonly>${data.eliminationComments || ''}</textarea>
                                </div>
        
                                <!-- Sensory -->
                                <div>
                                    <h5 class="text-lg font-semibold text-blue-900">Sensory</h5>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Vision:</span>
                                        <div>
                                            <input type="checkbox" ${data.visionNormal ? 'checked' : ''} disabled> Normal
                                            <input type="checkbox" ${data.visionImpaired ? 'checked' : ''} disabled> Impaired
                                            <input type="checkbox" ${data.visionCorrectiveDevice ? 'checked' : ''} disabled> Corrective Device
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between mt-2">
                                        <span>Hearing:</span>
                                        <div>
                                            <input type="checkbox" ${data.hearingNormal ? 'checked' : ''} disabled> Normal
                                            <input type="checkbox" ${data.hearingImpaired ? 'checked' : ''} disabled> Impaired
                                            <input type="checkbox" ${data.hearingCorrectiveDevice ? 'checked' : ''} disabled> Corrective Device
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 class="text-lg font-semibold text-blue-900">Comments:</h5>
                                    <textarea class="border border-blue-900 p-2 rounded-md w-full h-24" readonly>${data.sensoryComments || ''}</textarea>
                                </div>
                            </div>
                        </div>
        
                        <!-- Allergies and Current Medications -->
                        <div class="grid grid-cols-2 gap-6 mb-6">
                            <!-- Allergies -->
                            <div>
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Allergies</h4>
                                <div class="grid grid-cols-3 gap-2">
                                    <div>
                                        <input type="checkbox" ${data.allergyFood ? 'checked' : ''} disabled> Food
                                        <input type="text" value="${data.allergyFoodType || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                        <input type="text" value="${data.allergyFoodReactions || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                    </div>
                                    <div>
                                        <input type="checkbox" ${data.allergyMedicine ? 'checked' : ''} disabled> Medicine
                                        <input type="text" value="${data.allergyMedicineType || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                        <input type="text" value="${data.allergyMedicineReactions || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                    </div>
                                    <div>
                                        <input type="checkbox" ${data.allergyLatex ? 'checked' : ''} disabled> Latex
                                        <input type="text" value="${data.allergyLatexType || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                        <input type="text" value="${data.allergyLatexReactions || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                    </div>
                                    <div>
                                        <input type="checkbox" ${data.allergyEnvironment ? 'checked' : ''} disabled> Environment
                                        <input type="text" value="${data.allergyEnvironmentType || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                        <input type="text" value="${data.allergyEnvironmentReactions || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                    </div>
                                </div>
                            </div>
        
                            <!-- Current Medications -->
                            <div>
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Current Medications</h4>
                                <div class="grid grid-cols-1 gap-2">
                                    <input type="text" value="${data.medication1 || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                    <input type="text" value="${data.medication2 || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                    <input type="text" value="${data.medication3 || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                    <input type="text" value="${data.medication4 || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                    <input type="text" value="${data.medication5 || ''}" class="border border-blue-900 p-2 rounded-md w-full" readonly>
                                </div>
                            </div>
                        </div>
        
                        <!-- Family Medical History -->
                        <div class="mb-6">
                            <h4 class="text-xl font-semibold text-blue-900 mb-2">Family Medical History</h4>
                            <table class="w-full border border-blue-900">
                                <thead>
                                    <tr class="text-blue-900">
                                        <th class="border border-blue-900 p-2">Relation</th>
                                        <th class="border border-blue-900 p-2">Age if Living</th>
                                        <th class="border border-blue-900 p-2">Age at Death</th>
                                        <th class="border border-blue-900 p-2">Present Condition</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border border-blue-900 p-2 text-blue-900">Father</td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.fatherAgeLiving || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.fatherAgeDeath || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.fatherCondition || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-900 p-2 text-blue-900">Mother</td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.motherAgeLiving || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.motherAgeDeath || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.motherCondition || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-900 p-2 text-blue-900">Siblings</td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.siblingsAgeLiving || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.siblingsAgeDeath || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" value="${data.siblingsCondition || ''}" class="w-full border p-2 rounded-md" readonly></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-900 p-2 text-blue-900"></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-900 p-2 text-blue-900"></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-900 p-2 text-blue-900"></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                        <td class="border border-blue-900 p-2"><input type="text" class="w-full border p-2 rounded-md" readonly></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }
        
            // Function to clear input fields
            function clearInputFields() {
                const inputFields = document.querySelectorAll('input, textarea');
                inputFields.forEach(field => {
                    if (field.type === 'checkbox') {
                        field.checked = false;
                    } else {
                        field.value = '';
                    }
                });
            }
        }
        
        
        
        
        

        // Helper function to generate multiple input fields dynamically
        function generateInputFields(count, placeholderText) {
            let fields = "";
            for (let i = 0; i < count; i++) {
                fields += `
                    <input type="text" class="border border-blue-700 p-2 rounded w-full" placeholder="${placeholderText}">
                    <input type="date" class="border border-blue-700 p-2 rounded w-full">
                `;
            }
            return fields;
        }

        // Helper function to generate additional vaccine fields
        function generateVaccineFields(count) {
            let fields = "";
            for (let i = 0; i < count; i++) {
                fields += `
                    <div class="flex space-x-2 p-1">
                        <input type="text" class="border border-blue-700 p-2 rounded w-full" placeholder="Additional Vaccine">
                        <input type="date" class="border border-blue-700 p-2 rounded">
                    </div>
                `;
            }
            return fields;
        }
        // Helper function to generate additional checkbox fields
        function generateCheckboxFields(count) {
            let fields = "";
            for (let i = 0; i < count; i++) {
                fields += `
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="mr-2">
                        <input type="text" class="border border-blue-700 p-2 rounded w-full" placeholder="Specify Condition">
                    </label>
                `;
            }
            return fields;
        }
        
        function showHealthAssessment() {
            const content = document.getElementById('content');
            content.innerHTML = `
                <div class="p-4 bg-gray rounded-lg shadow-md h-[100vh] w-full overflow-y-auto">
                    <!-- Weight, Height, BMI -->
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-semibold text-blue-900">Weight (kg):</label>
                            <input type="number" id="weightInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter weight">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-blue-900">Height (cm):</label>
                            <input type="number" id="heightInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter height">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-blue-900">BMI:</label>
                            <input type="text" id="bmiInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="BMI" readonly>
                        </div>
                    </div>
        
                    <!-- Conducted by, Date, Time -->
                    <div class="p-2 mb-4">
                        <label class="block text-sm font-semibold text-blue-900">Assessment Conducted by:</label>
                        <input type="text" id="conductedByInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter name">
                        <div class="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <label class="block text-sm font-semibold text-blue-900">Date:</label>
                                <input type="date" id="dateInput" class="border border-blue-900 p-1 w-full rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-blue-900">Time (24H Format):</label>
                                <input type="time" id="timeInput" class="border border-blue-900 p-1 w-full rounded-md">
                            </div>
                        </div>
                    </div>
        
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Orientation -->
                        <div class="p-2">
                            <h3 class="font-bold text-sm mb-2 text-blue-900">Orientation</h3>
                            <div class="grid grid-cols-3 gap-1 text-xs text-blue-900">
                                <label><input type="checkbox" id="alertCheckbox"> Alert</label>
                                <label><input type="checkbox" id="drowsyCheckbox"> Drowsy</label>
                                <label><input type="checkbox" id="lethargicCheckbox"> Lethargic</label>
                                <label><input type="checkbox" id="stuporousCheckbox"> Stuporous</label>
                                <label><input type="checkbox" id="comaCheckbox"> Coma</label>
                            </div>
                            <table class="w-full mt-2 text-center text-xs text-blue-900">
                                <tr><td class="p-1">Person</td><td><input type="text" id="personInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Place</td><td><input type="text" id="placeInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Time</td><td><input type="text" id="timeOrientationInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Situation</td><td><input type="text" id="situationInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                            </table>
                        </div>
        
                        <!-- Vital Signs -->
                        <div class="p-2">
                            <h3 class="font-bold text-sm mb-2 text-blue-900">Vital Signs</h3>
                            <table class="w-full text-center text-xs text-blue-900">
                                <tr><td class="p-1">Temp</td><td><input type="text" id="tempInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">BP</td><td><input type="text" id="bpInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">RR</td><td><input type="text" id="rrInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">PR</td><td><input type="text" id="prInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">O2</td><td><input type="text" id="o2Input" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                            </table>
                        </div>
                    </div>
        
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <!-- Head -->
                        <div class="p-2">
                            <h3 class="font-bold text-sm mb-2 text-blue-900">Head</h3>
                            <table class="w-full text-center text-xs text-blue-900">
                                <tr><td class="p-1">Hair</td><td><input type="text" id="hairInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Eyes</td><td><input type="text" id="eyesInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Nose</td><td><input type="text" id="noseInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Ears</td><td><input type="text" id="earsInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Mouth</td><td><input type="text" id="mouthInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Lesions</td><td><input type="text" id="lesionsInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Dentition</td><td><input type="text" id="dentitionInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                            </table>
                        </div>
        
                        <!-- Neck -->
                        <div class="p-2">
                            <h3 class="font-bold text-sm mb-2 text-blue-900">Neck</h3>
                            <table class="w-full text-center text-xs text-blue-900">
                                <tr><td class="p-1">Carotid Pulse</td><td><input type="text" id="carotidPulseInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">JVD</td><td><input type="text" id="jvdInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Trachea</td><td><input type="text" id="tracheaInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Lymph Nodes</td><td><input type="text" id="lymphNodesInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Thyroid Glands</td><td><input type="text" id="thyroidGlandsInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Cervical Vertebrae</td><td><input type="text" id="cervicalVertebraeInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                            </table>
                        </div>
                    </div>
        
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <!-- Chest -->
                        <div class="p-2">
                            <h3 class="font-bold text-sm mb-2 text-blue-900">Chest</h3>
                            <table class="w-full text-center text-xs text-blue-900">
                                <tr><td class="p-1">Apical Pulse</td><td><input type="text" id="apicalPulseInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Muffled</td><td><input type="text" id="muffledInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Arrhythmia</td><td><input type="text" id="arrhythmiaInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Breath Sounds</td><td><input type="text" id="breathSoundsInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Chest Symmetry</td><td><input type="text" id="chestSymmetryInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                            </table>
                        </div>
        
                        <!-- Abdomen -->
                        <div class="p-2">
                            <h3 class="font-bold text-sm mb-2 text-blue-900">Abdomen</h3>
                            <label class="block text-sm text-blue-900">Inspection:</label>
                            <textarea id="abdomenInspectionInput" class="border border-blue-900 p-1 w-full rounded-md"></textarea>
                            <h4 class="font-bold text-sm mt-2 text-blue-900">Auscultation</h4>
                            <div class="grid grid-cols-4 gap-2 text-xs text-blue-900">
                                <label>LUQ <input type="checkbox" id="luqActiveCheckbox"> Active <input type="checkbox" id="luqHyperCheckbox"> Hyper <input type="checkbox" id="luqNormalCheckbox"></label>
                                <label>RUQ <input type="checkbox" id="ruqActiveCheckbox"> Active <input type="checkbox" id="ruqHyperCheckbox"> Hyper <input type="checkbox" id="ruqNormalCheckbox"></label>
                                <label>LLQ <input type="checkbox" id="llqActiveCheckbox"> Active <input type="checkbox" id="llqHyperCheckbox"> Hyper <input type="checkbox" id="llqNormalCheckbox"></label>
                                <label>RLQ <input type="checkbox" id="rlqActiveCheckbox"> Active <input type="checkbox" id="rlqHyperCheckbox"> Hyper <input type="checkbox" id="rlqNormalCheckbox"></label>
                            </div>
                            <label class="block text-sm text-blue-900 mt-2">Palpation:</label>
                            <textarea id="abdomenPalpationInput" class="border border-blue-900 p-1 w-full rounded-md"></textarea>
                        </div>
                    </div>
        
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <!-- Upper Extremities -->
                        <div class="p-2">
                            <h3 class="font-bold text-sm mb-2 text-blue-900">Upper Extremities</h3>
                            <table class="w-full text-center text-xs text-blue-900">
                                <tr><td class="p-1">Radial Pulse</td><td><input type="text" id="radialPulseInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Temperature</td><td><input type="text" id="temperatureInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Capillary Refills</td><td><input type="text" id="capillaryRefillsInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                                <tr><td class="p-1">Nails</td><td><input type="text" id="nailsInput" class="border border-blue-900 p-1 w-full rounded-md" placeholder="Enter details"></td></tr>
                            </table>
                        </div>
                    </div>
        
                    <!-- Nurse's Notes and Doctor Progress Notes -->
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="p-2">
                            <label class="block text-sm font-semibold text-blue-900">Nurse's Notes:</label>
                            <textarea id="nursesNotesInput" class="border border-blue-900 p-1 w-full rounded-md h-32"></textarea>
                        </div>
                        <div class="p-2">
                            <label class="block text-sm font-semibold text-blue-900">Doctor Progress Notes:</label>
                            <textarea id="doctorNotesInput" class="border border-blue-900 p-1 w-full rounded-md h-32"></textarea>
                        </div>
                    </div>
        
                    <div class="flex flex-col items-end mt-4 space-y-2">
                        <button id="healthSubmitButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">Submit Credentials</button>
                        <button id="healthSummaryButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">View Patient History</button>
                    </div>
        
                    <div class="h-20"></div> <!-- Added space at the bottom -->
                </div>
        
                <!-- Patient List Modal Structure -->
                <div id="patientListModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white rounded-lg shadow-lg w-80 max-h-[80vh] overflow-y-auto p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-2xl font-bold text-blue-900">Select Patient</h3>
                            <button id="closePatientListModal" class="text-black text-2xl font-bold">&times;</button>
                        </div>
                        <ul id="patientList" class="space-y-2"></ul>
                    </div>
                </div>
        
                <!-- View Patient History Modal Structure -->
                <div id="viewHistoryModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto flex relative">
                        <button id="closeViewHistoryModal" class="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
                        <!-- Patient List -->
                        <div class="w-full p-4 border-r border-gray-300 overflow-y-auto">
                            <h3 class="text-2xl font-bold text-blue-900 mb-4">Patients</h3>
                            <ul id="historyPatientList"></ul>
                        </div>
                        <!-- Summary Content -->
                        <div class="w-full p-4 overflow-y-auto hidden" id="summaryModalContent">
                            <div id="summaryContent"></div>
                        </div>
                    </div>
                </div>
            `;
        
            // Add event listeners to calculate BMI
            const weightInput = document.getElementById("weightInput");
            const heightInput = document.getElementById("heightInput");
            const bmiInput = document.getElementById("bmiInput");
        
            function calculateBMI() {
                const weight = parseFloat(weightInput.value);
                const height = parseFloat(heightInput.value) / 100; // Convert cm to meters
                if (!isNaN(weight) && !isNaN(height) && height > 0) {
                    const bmi = (weight / (height * height)).toFixed(2);
                    bmiInput.value = bmi;
                } else {
                    bmiInput.value = "";
                }
            }
        
            weightInput.addEventListener("input", calculateBMI);
            heightInput.addEventListener("input", calculateBMI);
        
            setActiveButtons(healthBtn);
        
            document.getElementById("healthSubmitButton").addEventListener("click", function() {
                const patients = JSON.parse(localStorage.getItem("patients")) || [];
                const patientListContainer = document.getElementById("patientList");
                patientListContainer.innerHTML = ""; // Clear any previous list
        
                if (patients.length > 0) {
                    patients.forEach(patient => {
                        const listItem = document.createElement("li");
                        listItem.textContent = patient.name;
                        listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline", "p-2", "border-b", "border-gray-200");
                        listItem.addEventListener("click", () => {
                            alert(`Credentials submitted to ${patient.name}`);
                            savePatientCredentials(patient);
                            clearInputFields(); // Clear the input fields after saving
                            document.getElementById("patientListModal").classList.add("hidden");
                        });
                        patientListContainer.appendChild(listItem);
                    });
                } else {
                    patientListContainer.innerHTML = "<p>No patients found.</p>";
                }
        
                // Show the modal
                document.getElementById("patientListModal").classList.remove("hidden");
            });
        
            document.getElementById("healthSummaryButton").addEventListener("click", function() {
                const patients = JSON.parse(localStorage.getItem("patients")) || [];
                const patientListContainer = document.getElementById("historyPatientList");
                patientListContainer.innerHTML = ""; // Clear any previous list
        
                if (patients.length > 0) {
                    patients.forEach(patient => {
                        const listItem = document.createElement("li");
                        listItem.textContent = patient.name;
                        listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline", "p-2", "border-b", "border-gray-200");
                        listItem.addEventListener("click", () => togglePatientSummary(patient));
                        patientListContainer.appendChild(listItem);
                    });
                } else {
                    patientListContainer.innerHTML = "<p>No patients found.</p>";
                }
        
                // Show the patient list modal first
                document.getElementById("viewHistoryModal").classList.remove("hidden");
                document.querySelector("#viewHistoryModal .w-full.p-4.border-r").classList.remove("hidden");
                document.getElementById("summaryModalContent").classList.add("hidden");
            });
        
            document.getElementById("closePatientListModal").addEventListener("click", function() {
                // Hide the modal
                document.getElementById("patientListModal").classList.add("hidden");
            });
        
            document.getElementById("closeViewHistoryModal").addEventListener("click", function() {
                // Hide the modal
                document.getElementById("viewHistoryModal").classList.add("hidden");
            });
        
            // Function to save patient credentials
            function savePatientCredentials(patient) {
                // Collect all input values from the main form
                const data = {
                    weight: document.getElementById("weightInput").value,
                    height: document.getElementById("heightInput").value,
                    bmi: document.getElementById("bmiInput").value,
                    conductedBy: document.getElementById("conductedByInput").value,
                    date: document.getElementById("dateInput").value,
                    time: document.getElementById("timeInput").value,
                    alert: document.getElementById("alertCheckbox").checked,
                    drowsy: document.getElementById("drowsyCheckbox").checked,
                    lethargic: document.getElementById("lethargicCheckbox").checked,
                    stuporous: document.getElementById("stuporousCheckbox").checked,
                    coma: document.getElementById("comaCheckbox").checked,
                    person: document.getElementById("personInput").value,
                    place: document.getElementById("placeInput").value,
                    timeOrientation: document.getElementById("timeOrientationInput").value,
                    situation: document.getElementById("situationInput").value,
                    temp: document.getElementById("tempInput").value,
                    bp: document.getElementById("bpInput").value,
                    rr: document.getElementById("rrInput").value,
                    pr: document.getElementById("prInput").value,
                    o2: document.getElementById("o2Input").value,
                    hair: document.getElementById("hairInput").value,
                    eyes: document.getElementById("eyesInput").value,
                    nose: document.getElementById("noseInput").value,
                    ears: document.getElementById("earsInput").value,
                    mouth: document.getElementById("mouthInput").value,
                    lesions: document.getElementById("lesionsInput").value,
                    dentition: document.getElementById("dentitionInput").value,
                    carotidPulse: document.getElementById("carotidPulseInput").value,
                    jvd: document.getElementById("jvdInput").value,
                    trachea: document.getElementById("tracheaInput").value,
                    lymphNodes: document.getElementById("lymphNodesInput").value,
                    thyroidGlands: document.getElementById("thyroidGlandsInput").value,
                    cervicalVertebrae: document.getElementById("cervicalVertebraeInput").value,
                    apicalPulse: document.getElementById("apicalPulseInput").value,
                    muffled: document.getElementById("muffledInput").value,
                    arrhythmia: document.getElementById("arrhythmiaInput").value,
                    breathSounds: document.getElementById("breathSoundsInput").value,
                    chestSymmetry: document.getElementById("chestSymmetryInput").value,
                    abdomenInspection: document.getElementById("abdomenInspectionInput").value,
                    luqActive: document.getElementById("luqActiveCheckbox").checked,
                    luqHyper: document.getElementById("luqHyperCheckbox").checked,
                    luqNormal: document.getElementById("luqNormalCheckbox").checked,
                    ruqActive: document.getElementById("ruqActiveCheckbox").checked,
                    ruqHyper: document.getElementById("ruqHyperCheckbox").checked,
                    ruqNormal: document.getElementById("ruqNormalCheckbox").checked,
                    llqActive: document.getElementById("llqActiveCheckbox").checked,
                    llqHyper: document.getElementById("llqHyperCheckbox").checked,
                    llqNormal: document.getElementById("llqNormalCheckbox").checked,
                    rlqActive: document.getElementById("rlqActiveCheckbox").checked,
                    rlqHyper: document.getElementById("rlqHyperCheckbox").checked,
                    rlqNormal: document.getElementById("rlqNormalCheckbox").checked,
                    abdomenPalpation: document.getElementById("abdomenPalpationInput").value,
                    radialPulse: document.getElementById("radialPulseInput").value,
                    temperature: document.getElementById("temperatureInput").value,
                    capillaryRefills: document.getElementById("capillaryRefillsInput").value,
                    nails: document.getElementById("nailsInput").value,
                    nursesNotes: document.getElementById("nursesNotesInput").value, // New field
                    doctorNotes: document.getElementById("doctorNotesInput").value // New field
                };
        
                // Save data to local storage specific to the patient
                const patientDataKey = `healthAssessmentData_${patient.id}`;
                localStorage.setItem(patientDataKey, JSON.stringify(data));
            }
        
            // Function to toggle patient summary
            function togglePatientSummary(patient) {
                const summaryModalContent = document.getElementById("summaryModalContent");
                if (summaryModalContent.classList.contains("hidden")) {
                    // Retrieve saved data from local storage specific to the patient
                    const patientDataKey = `healthAssessmentData_${patient.id}`;
                    const data = JSON.parse(localStorage.getItem(patientDataKey)) || {};
        
                    // Generate the summary content
                    const summaryContent = generateSummaryContent(patient, data);
        
                    // Populate the summary modal content
                    summaryModalContent.innerHTML = summaryContent;
        
                    // Show the summary content
                    summaryModalContent.classList.remove("hidden");
                    document.querySelector("#viewHistoryModal .w-full.p-4.border-r").classList.add("hidden");
                } else {
                    // Hide the summary content and show the patient list
                    summaryModalContent.classList.add("hidden");
                    document.querySelector("#viewHistoryModal .w-full.p-4.border-r").classList.remove("hidden");
                }
            }
        
            function generateSummaryContent(patient, data) {
                return `
                    <div class="p-4 bg-gray rounded-lg shadow-md h-full w-full overflow-y-auto">
                        <h3 class="text-2xl font-bold text-blue-900 mb-4">Patient Summary for ${patient.name}</h3>
                        <div class="mb-6">
                            <h4 class="text-xl font-semibold text-blue-900 mb-2">Weight, Height, BMI</h4>
                            <div class="grid grid-cols-3 gap-4">
                                <div>
                                    <label class="text-blue-900">Weight (kg):</label>
                                    <p>${data.weight || 'N/A'}</p>
                                </div>
                                <div>
                                    <label class="text-blue-900">Height (cm):</label>
                                    <p>${data.height || 'N/A'}</p>
                                </div>
                                <div>
                                    <label class="text-blue-900">BMI:</label>
                                    <p>${data.bmi || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
        
                        <div class="mb-6">
                            <h4 class="text-xl font-semibold text-blue-900 mb-2">Conducted by, Date, Time</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-blue-900">Assessment Conducted by:</label>
                                    <p>${data.conductedBy || 'N/A'}</p>
                                </div>
                                <div>
                                    <label class="text-blue-900">Date:</label>
                                    <p>${data.date || 'N/A'}</p>
                                </div>
                                <div>
                                    <label class="text-blue-900">Time (24H Format):</label>
                                    <p>${data.time || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Orientation</h4>
                                <div class="grid grid-cols-3 gap-1 text-xs text-blue-900">
                                    <p>Alert: ${data.alert ? 'Yes' : 'No'}</p>
                                    <p>Drowsy: ${data.drowsy ? 'Yes' : 'No'}</p>
                                    <p>Lethargic: ${data.lethargic ? 'Yes' : 'No'}</p>
                                    <p>Stuporous: ${data.stuporous ? 'Yes' : 'No'}</p>
                                    <p>Coma: ${data.coma ? 'Yes' : 'No'}</p>
                                </div>
                                <table class="w-full mt-2 text-center text-xs text-blue-900">
                                    <tr><td class="p-1">Person</td><td>${data.person || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Place</td><td>${data.place || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Time</td><td>${data.timeOrientation || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Situation</td><td>${data.situation || 'N/A'}</td></tr>
                                </table>
                            </div>
        
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Vital Signs</h4>
                                <table class="w-full text-center text-xs text-blue-900">
                                    <tr><td class="p-1">Temp</td><td>${data.temp || 'N/A'}</td></tr>
                                    <tr><td class="p-1">BP</td><td>${data.bp || 'N/A'}</td></tr>
                                    <tr><td class="p-1">RR</td><td>${data.rr || 'N/A'}</td></tr>
                                    <tr><td class="p-1">PR</td><td>${data.pr || 'N/A'}</td></tr>
                                    <tr><td class="p-1">O2</td><td>${data.o2 || 'N/A'}</td></tr>
                                </table>
                            </div>
                        </div>
        
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Head</h4>
                                <table class="w-full text-center text-xs text-blue-900">
                                    <tr><td class="p-1">Hair</td><td>${data.hair || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Eyes</td><td>${data.eyes || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Nose</td><td>${data.nose || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Ears</td><td>${data.ears || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Mouth</td><td>${data.mouth || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Lesions</td><td>${data.lesions || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Dentition</td><td>${data.dentition || 'N/A'}</td></tr>
                                </table>
                            </div>
        
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Neck</h4>
                                <table class="w-full text-center text-xs text-blue-900">
                                    <tr><td class="p-1">Carotid Pulse</td><td>${data.carotidPulse || 'N/A'}</td></tr>
                                    <tr><td class="p-1">JVD</td><td>${data.jvd || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Trachea</td><td>${data.trachea || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Lymph Nodes</td><td>${data.lymphNodes || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Thyroid Glands</td><td>${data.thyroidGlands || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Cervical Vertebrae</td><td>${data.cervicalVertebrae || 'N/A'}</td></tr>
                                </table>
                            </div>
                        </div>
        
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Chest</h4>
                                <table class="w-full text-center text-xs text-blue-900">
                                    <tr><td class="p-1">Apical Pulse</td><td>${data.apicalPulse || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Muffled</td><td>${data.muffled || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Arrhythmia</td><td>${data.arrhythmia || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Breath Sounds</td><td>${data.breathSounds || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Chest Symmetry</td><td>${data.chestSymmetry || 'N/A'}</td></tr>
                                </table>
                            </div>
        
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Abdomen</h4>
                                <label class="block text-sm text-blue-900">Inspection:</label>
                                <p>${data.abdomenInspection || 'N/A'}</p>
                                <h4 class="font-bold text-sm mt-2 text-blue-900">Auscultation</h4>
                                <div class="grid grid-cols-4 gap-2 text-xs text-blue-900">
                                    <p>LUQ Active: ${data.luqActive ? 'Yes' : 'No'}</p>
                                    <p>LUQ Hyper: ${data.luqHyper ? 'Yes' : 'No'}</p>
                                    <p>LUQ Normal: ${data.luqNormal ? 'Yes' : 'No'}</p>
                                    <p>RUQ Active: ${data.ruqActive ? 'Yes' : 'No'}</p>
                                    <p>RUQ Hyper: ${data.ruqHyper ? 'Yes' : 'No'}</p>
                                    <p>RUQ Normal: ${data.ruqNormal ? 'Yes' : 'No'}</p>
                                    <p>LLQ Active: ${data.llqActive ? 'Yes' : 'No'}</p>
                                    <p>LLQ Hyper: ${data.llqHyper ? 'Yes' : 'No'}</p>
                                    <p>LLQ Normal: ${data.llqNormal ? 'Yes' : 'No'}</p>
                                    <p>RLQ Active: ${data.rlqActive ? 'Yes' : 'No'}</p>
                                    <p>RLQ Hyper: ${data.rlqHyper ? 'Yes' : 'No'}</p>
                                    <p>RLQ Normal: ${data.rlqNormal ? 'Yes' : 'No'}</p>
                                </div>
                                <label class="block text-sm text-blue-900 mt-2">Palpation:</label>
                                <p>${data.abdomenPalpation || 'N/A'}</p>
                            </div>
                        </div>
        
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Upper Extremities</h4>
                                <table class="w-full text-center text-xs text-blue-900">
                                    <tr><td class="p-1">Radial Pulse</td><td>${data.radialPulse || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Temperature</td><td>${data.temperature || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Capillary Refills</td><td>${data.capillaryRefills || 'N/A'}</td></tr>
                                    <tr><td class="p-1">Nails</td><td>${data.nails || 'N/A'}</td></tr>
                                </table>
                            </div>
        
                            <!-- Nurse's Notes and Doctor Progress Notes -->
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Nurse's Notes</h4>
                                <p>${data.nursesNotes || 'N/A'}</p>
                            </div>
                            <div class="mb-6">
                                <h4 class="text-xl font-semibold text-blue-900 mb-2">Doctor Progress Notes</h4>
                                <p>${data.doctorNotes || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        
            // Function to clear input fields
            function clearInputFields() {
                const inputFields = document.querySelectorAll('input, textarea');
                inputFields.forEach(field => {
                    if (field.type === 'checkbox') {
                        field.checked = false;
                    } else {
                        field.value = '';
                    }
                });
            }
        }
        
        
        

        function showVitalSigns() {
    content.innerHTML = `
        <div class="p-6 bg-gray rounded-lg relative -mt-6 h-[80vh] overflow-y-auto">
            <!-- Date & Time -->
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label for="date" class="block text-blue-900 font-semibold">Date of Assessment</label>
                    <input type="date" id="date" class="w-full p-2 border border-blue-700 rounded focus:ring focus:ring-blue-300">
                </div>
                <div>
                    <label for="time" class="block text-blue-900 font-semibold">Time of Assessment (24H Format)</label>
                    <input type="time" id="time" class="w-full p-2 border border-blue-700 rounded focus:ring focus:ring-blue-300">
                </div>
            </div>

            <!-- Vital Signs Graph -->
            <div class="mb-6">
                <canvas id="vitalSignsChart" width="400" height="200"></canvas>
            </div>

            <!-- Vital Signs Inputs -->
            <div class="grid grid-cols-3 gap-6">
                <div>
                    <label for="bloodPressure" class="block text-blue-900 font-semibold">Blood Pressure</label>
                    <input type="text" id="bloodPressure" class="w-full p-2 border border-blue-700 rounded focus:ring focus:ring-blue-300">
                </div>
                <div>
                    <label for="temperature" class="block text-blue-900 font-semibold">Temperature</label>
                    <input type="number" id="temperature" class="w-full p-2 border border-blue-700 rounded focus:ring focus:ring-blue-300">
                </div>
                <div>
                    <label for="pulseRate" class="block text-blue-900 font-semibold">Pulse Rate</label>
                    <input type="number" id="pulseRate" class="w-full p-2 border border-blue-700 rounded focus:ring focus:ring-blue-300">
                </div>
                <div>
                    <label for="respiratoryRate" class="block text-blue-900 font-semibold">Respiratory Rate</label>
                    <input type="number" id="respiratoryRate" class="w-full p-2 border border-blue-700 rounded focus:ring focus:ring-blue-300">
                </div>
                <div>
                    <label for="oxygenSaturation" class="block text-blue-900 font-semibold">Oxygen Saturation</label>
                    <input type="number" id="oxygenSaturation" class="w-full p-2 border border-blue-700 rounded focus:ring focus:ring-blue-300">
                </div>
                <div>
                    <label for="painScale" class="block text-blue-900 font-semibold">Pain Scale</label>
                    <input type="text" id="painScale" class="w-full p-2 border border-blue-700 rounded focus:ring focus:ring-blue-300">
                </div>
            </div>

            <!-- Submit and View History Buttons -->
            <div class="mt-8 text-right flex justify-end space-x-2">
                <button id="submitVitalsButton" class="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800">Submit Credentials</button>
                <button id="viewHistoryButton" class="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800">View Patient History</button>
            </div>
        </div>

        <!-- Modal Structure -->
        <div id="modal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 relative" id="modalContent">
                <button id="closeModal" class="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
                <!-- Patient List -->
                <div class="overflow-y-auto">
                    <h3 class="text-2xl font-bold text-blue-900 mb-4 text-center" id="modalTitle">Patients</h3>
                    <ul id="patientList" class="space-y-2"></ul>
                    <div id="patientHistory"></div>
                </div>
            </div>
        </div>
    `;

    setActiveButtons(vitalBtn);

    let patientCredentials = {};

    // Validation Helpers
    const setInvalidStyle = (input) => {
        input.classList.remove("border-blue-700");
        input.classList.add("border-red-500");
    };

    const setValidStyle = (input) => {
        input.classList.remove("border-red-500");
        input.classList.add("border-blue-700");
    };

    // Temperature validation
    const temperatureInput = document.getElementById("temperature");
    temperatureInput.addEventListener("input", () => {
        const val = parseFloat(temperatureInput.value);
        if (!isNaN(val) && (val < 36.5 || val > 37.5)) {
            setInvalidStyle(temperatureInput);
        } else {
            setValidStyle(temperatureInput);
        }
    });

    // Blood Pressure validation (mark below 120/80 as "not good")
    const bloodPressureInput = document.getElementById("bloodPressure");
    bloodPressureInput.addEventListener("input", () => {
        const value = bloodPressureInput.value.trim();
        const pattern = /^\d{2,3}\/\d{2,3}$/;

        if (!pattern.test(value)) {
            setInvalidStyle(bloodPressureInput);
            return;
        }

        const [sys, dia] = value.split('/').map(Number);
        if (sys < 120 || dia < 80) {
            setInvalidStyle(bloodPressureInput);
        } else {
            setValidStyle(bloodPressureInput);
        }
    });

    // Pulse Rate validation
    const pulseRateInput = document.getElementById("pulseRate");
    pulseRateInput.addEventListener("input", () => {
        const val = parseFloat(pulseRateInput.value);
        if (!isNaN(val) && (val < 60 || val > 100)) {
            setInvalidStyle(pulseRateInput);
        } else {
            setValidStyle(pulseRateInput);
        }
    });

    // Respiratory Rate validation
    const respiratoryRateInput = document.getElementById("respiratoryRate");
    respiratoryRateInput.addEventListener("input", () => {
        const val = parseFloat(respiratoryRateInput.value);
        if (!isNaN(val) && (val < 16 || val > 20)) {
            setInvalidStyle(respiratoryRateInput);
        } else {
            setValidStyle(respiratoryRateInput);
        }
    });

    // Oxygen Saturation validation
    const oxygenSaturationInput = document.getElementById("oxygenSaturation");
    oxygenSaturationInput.addEventListener("input", () => {
        const val = parseFloat(oxygenSaturationInput.value);
        if (!isNaN(val) && (val < 95 || val > 100)) {
            setInvalidStyle(oxygenSaturationInput);
        } else {
            setValidStyle(oxygenSaturationInput);
        }
    });

    // Submit Credentials Button
    document.getElementById("submitVitalsButton").addEventListener("click", function() {
        const requiredFields = ["date", "time", "bloodPressure", "temperature", "pulseRate", "respiratoryRate", "oxygenSaturation", "painScale"];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                isValid = false;
            }
        });

        if (!isValid) {
            alert("Please fill out all required fields before submitting.");
            return;
        }

        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        const patientListContainer = document.getElementById("patientList");
        patientListContainer.innerHTML = ""; // Clear any previous list

        if (patients.length > 0) {
            patients.forEach(patient => {
                const listItem = document.createElement("li");
                listItem.textContent = patient.name;
                listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline", "text-center", "p-2", "border", "rounded");
                listItem.addEventListener("click", () => submitCredentialsToPatient(patient));
                patientListContainer.appendChild(listItem);
            });
        } else {
            patientListContainer.innerHTML = "<p class='text-center'>No patients found.</p>";
        }

        // Show the modal
        document.getElementById("modal").classList.remove("hidden");
        document.getElementById("modalTitle").textContent = "Select Patient";
        document.getElementById("patientHistory").innerHTML = ""; // Clear any previous history
    });

    // View Patient History Button
    document.getElementById("viewHistoryButton").addEventListener("click", function() {
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        const patientListContainer = document.getElementById("patientList");
        patientListContainer.innerHTML = ""; // Clear any previous list

        if (patients.length > 0) {
            patients.forEach(patient => {
                const listItem = document.createElement("li");
                listItem.textContent = patient.name;
                listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline", "text-center", "p-2", "border", "rounded");
                listItem.addEventListener("click", () => viewPatientCredentials(patient));
                patientListContainer.appendChild(listItem);
            });
        } else {
            patientListContainer.innerHTML = "<p class='text-center'>No patients found.</p>";
        }

        // Show the modal
        document.getElementById("modal").classList.remove("hidden");
        document.getElementById("modalTitle").textContent = "Select Patient";
        document.getElementById("patientHistory").innerHTML = ""; // Clear any previous history
    });

    document.getElementById("closeModal").addEventListener("click", function() {
        // Clear input fields
        clearInputFields();
        // Hide the modal
        document.getElementById("modal").classList.add("hidden");
        // Reset modal title and content
        document.getElementById("modalTitle").textContent = "Patients";
        document.getElementById("patientList").innerHTML = "";
        document.getElementById("patientHistory").innerHTML = "";
        // Reset modal size
        document.getElementById("modalContent").classList.remove("max-w-4xl");
        document.getElementById("modalContent").classList.add("max-w-md");
    });

    // Function to submit credentials to a specific patient
    function submitCredentialsToPatient(patient) {
        const data = {
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            bloodPressure: document.getElementById("bloodPressure").value,
            temperature: document.getElementById("temperature").value,
            pulseRate: document.getElementById("pulseRate").value,
            respiratoryRate: document.getElementById("respiratoryRate").value,
            oxygenSaturation: document.getElementById("oxygenSaturation").value,
            painScale: document.getElementById("painScale").value,
        };

        const patients = JSON.parse(localStorage.getItem("patients")) || [];

        const updatedPatients = patients.map(p => {
            if (p.id === patient.id) {
                // Initialize credentials array if missing
                if (!Array.isArray(p.credentials)) {
                    p.credentials = [];
                }

                // Push the new vital sign record
                p.credentials.push(data);
            }
            return p;
        });

        localStorage.setItem("patients", JSON.stringify(updatedPatients));

        alert(`Credentials submitted to ${patient.name}`);
        clearInputFields();
        document.getElementById("modal").classList.add("hidden");
        updateChart(data); // Update the chart with new data
    }

    // Function to view patient credentials
    function viewPatientCredentials(patient) {
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        const current = patients.find(p => p.id === patient.id);
        const dataList = current?.credentials || [];

        if (dataList.length === 0) {
            document.getElementById("patientHistory").innerHTML = `<p class="text-center">No credentials submitted for ${patient.name}.</p>`;
        } else {
            const groupedData = groupDataByDate(dataList);
            const tableContent = generateTableContent(groupedData);
            document.getElementById("patientHistory").innerHTML = tableContent;
            updateChart(dataList[dataList.length - 1]); // Update the chart with the latest data
        }

        // Hide the patient list and update modal title
        document.getElementById("patientList").innerHTML = "";
        document.getElementById("modalTitle").textContent = `Patient History for ${patient.name}`;

        // Adjust modal size for viewing patient history
        document.getElementById("modalContent").classList.remove("max-w-md");
        document.getElementById("modalContent").classList.add("max-w-4xl");
    }

    // Function to group data by date
    function groupDataByDate(dataList) {
        return dataList.reduce((acc, data) => {
            const date = data.date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(data);
            return acc;
        }, {});
    }

    // Function to generate table content
    function generateTableContent(groupedData) {
        let tableContent = `
            <table class="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Date</th>
                        <th class="py-2 px-4 border-b">Time</th>
                        <th class="py-2 px-4 border-b">Blood Pressure</th>
                        <th class="py-2 px-4 border-b">Temperature</th>
                        <th class="py-2 px-4 border-b">Pulse Rate</th>
                        <th class="py-2 px-4 border-b">Respiratory Rate</th>
                        <th class="py-2 px-4 border-b">Oxygen Saturation</th>
                        <th class="py-2 px-4 border-b">Pain Scale</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const date in groupedData) {
            groupedData[date].forEach(data => {
                tableContent += `
                    <tr>
                        <td class="py-2 px-4 border-b">${date}</td>
                        <td class="py-2 px-4 border-b">${data.time}</td>
                        <td class="py-2 px-4 border-b">${data.bloodPressure}</td>
                        <td class="py-2 px-4 border-b">${data.temperature}</td>
                        <td class="py-2 px-4 border-b">${data.pulseRate}</td>
                        <td class="py-2 px-4 border-b">${data.respiratoryRate}</td>
                        <td class="py-2 px-4 border-b">${data.oxygenSaturation}</td>
                        <td class="py-2 px-4 border-b">${data.painScale}</td>
                    </tr>
                `;
            });
        }

        tableContent += `
                </tbody>
            </table>
        `;

        return tableContent;
    }

    // Function to clear input fields
    function clearInputFields() {
        const inputFields = document.querySelectorAll('input');
        inputFields.forEach(field => {
            field.value = '';
            field.classList.remove("border-red-500");
            field.classList.add("border-blue-700");
        });
    }

    // Function to update the chart
    function updateChart(data) {
        const ctx = document.getElementById('vitalSignsChart').getContext('2d');
        const chartData = {
            labels: ['Blood Pressure', 'Temperature', 'Pulse Rate', 'Respiratory Rate', 'Oxygen Saturation', 'Pain Scale'],
            datasets: [{
                label: 'Vital Signs',
                data: [
                    parseInt(data.bloodPressure.split('/')[0]), // Systolic Blood Pressure
                    data.temperature,
                    data.pulseRate,
                    data.respiratoryRate,
                    data.oxygenSaturation,
                    parseInt(data.painScale)
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // Blood Pressure
                    'rgba(54, 162, 235, 0.2)', // Temperature
                    'rgba(255, 206, 86, 0.2)', // Pulse Rate
                    'rgba(75, 192, 192, 0.2)', // Respiratory Rate
                    'rgba(153, 102, 255, 0.2)', // Oxygen Saturation
                    'rgba(255, 159, 64, 0.2)'  // Pain Scale
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        new Chart(ctx, config);
    }

    // Initialize the chart with default data
    updateChart({
        bloodPressure: '120/80',
        temperature: 37,
        pulseRate: 72,
        respiratoryRate: 18,
        oxygenSaturation: 98,
        painScale: '0'
    });
}

        
        
        





                


        function showLabResults() {
            const content = document.getElementById('content');
            if (!content) {
                console.error('Content element not found');
                return;
            }
        
            content.innerHTML = `
                <div class="p-4 bg-gray rounded-lg shadow-md h-[100vh] w-full overflow-y-auto">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <div class="overflow-x-auto">
                            <div class="bg-gray-100 rounded-lg p-4 mb-4">
                                <label for="assessment-date" class="block text-lg font-semibold text-blue-900">Date of Assessment</label>
                                <input id="assessment-date" type="date" class="border border-blue-700 p-2 rounded">
                            </div>
                            <table class="min-w-full border border-blue-700 mt-2">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2 text-left text-2xl">Complete Blood Count</th>
                                        <th class="px-4 py-2 text-left text-gray-800">Results</th>
                                        <th class="px-4 py-2 text-left text-gray-800">Reference Range</th>
                                    </tr>
                                </thead>
                                <tbody class="text-blue-700">
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">White Blood Cell (WBC)</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="wbc" class="border p-1 w-full rounded" placeholder="Enter WBC count"></td>
                                        <td class="border border-blue-700 px-4 py-2">6,000–17,000 mm³</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Red Blood Cell (RBC)</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="rbc" class="border p-1 w-full rounded" placeholder="Enter RBC count"></td>
                                        <td class="border border-blue-700 px-4 py-2">3.90–5.30 million/mm³</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Hemoglobin (HGB)</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="hgb" class="border p-1 w-full rounded" placeholder="Enter HGB level"></td>
                                        <td class="border border-blue-700 px-4 py-2">11.3–14.1 g/dL</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Hematocrit (HCT)</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="hct" class="border p-1 w-full rounded" placeholder="Enter HCT level"></td>
                                        <td class="border border-blue-700 px-4 py-2">31% – 41%</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Mean Corpuscular Volume (MCV)</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="mcv" class="border p-1 w-full rounded" placeholder="Enter MCV level"></td>
                                        <td class="border border-blue-700 px-4 py-2">70–86 fL</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Mean Corpuscular Hemoglobin (MCH)</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="mch" class="border p-1 w-full rounded" placeholder="Enter MCH level"></td>
                                        <td class="border border-blue-700 px-4 py-2">23–31 pg</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Mean Corpuscular Hemoglobin Concentration (MCHC)</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="mchc" class="border p-1 w-full rounded" placeholder="Enter MCHC level"></td>
                                        <td class="border border-blue-700 px-4 py-2">32–36 g/dL RBC</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Platelet Count</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="plateletCount" class="border p-1 w-full rounded" placeholder="Enter platelet count"></td>
                                        <td class="border border-blue-700 px-4 py-2">150,000–400,000 platelets/mm³</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Neutrophils</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="neutrophils" class="border p-1 w-full rounded" placeholder="Enter neutrophil count"></td>
                                        <td class="border border-blue-700 px-4 py-2">1,000–8,500 mm³</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Lymphocytes</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="lymphocytes" class="border p-1 w-full rounded" placeholder="Enter lymphocyte count"></td>
                                        <td class="border border-blue-700 px-4 py-2">3,000–9,500 mm³</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Monocytes</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="monocytes" class="border p-1 w-full rounded" placeholder="Enter monocyte count"></td>
                                        <td class="border border-blue-700 px-4 py-2">300–850 mm³</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Eosinophils</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="eosinophils" class="border p-1 w-full rounded" placeholder="Enter eosinophil count"></td>
                                        <td class="border border-blue-700 px-4 py-2">165–465 mm³</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Basophils</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="basophils" class="border p-1 w-full rounded" placeholder="Enter basophil count"></td>
                                        <td class="border border-blue-700 px-4 py-2">0–140 mm³</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2" colspan="3">
                                            <label for="cbc-photo" class="block text-lg font-semibold text-blue-900">Upload of Laboratory Results</label>
                                            <input type="file" id="cbc-photo" class="border p-1 w-full rounded">
                                            <img id="cbc-photo-preview" class="mt-2 max-w-xs" src="#" alt="CBC Photo Preview">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2" colspan="3">
                                            <label for="additional-cbc-photo" class="block text-lg font-semibold text-blue-900">Upload of Image Results</label>
                                            <input type="file" id="additional-cbc-photo" class="border p-1 w-full rounded">
                                            <img id="additional-cbc-photo-preview" class="mt-2 max-w-xs" src="#" alt="Additional CBC Photo Preview">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br>
                            <div class="bg-gray-100 rounded-lg p-4 mb-4">
                                <label for="assessment-date" class="block text-lg font-semibold text-blue-900">Date of Assessment</label>
                                <input id="assessment-date" type="date" class="border border-blue-700 p-2 rounded">
                            </div>
                            <!-- Urinalysis Table -->
                            <table class="min-w-full border border-blue-700 mt-2">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2 text-left text-2xl">Urinalysis</th>
                                        <th class="px-4 py-2 text-left text-gray-800">Results</th>
                                        <th class="px-4 py-2 text-left text-gray-800">Reference Range</th>
                                    </tr>
                                </thead>
                                <tbody class="text-blue-700">
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Specific Gravity</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="specificGravity" class="border p-1 w-full rounded" placeholder="Enter Specific Gravity"></td>
                                        <td class="border border-blue-700 px-4 py-2">1.001-1.020</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">pH</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="ph" class="border p-1 w-full rounded" placeholder="Enter pH level"></td>
                                        <td class="border border-blue-700 px-4 py-2">5 to 7</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Protein</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="protein" class="border p-1 w-full rounded" placeholder="Enter Protein level"></td>
                                        <td class="border border-blue-700 px-4 py-2">Less than 10 mg/dL</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Glucose</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="glucose" class="border p-1 w-full rounded" placeholder="Enter Glucose level"></td>
                                        <td class="border border-blue-700 px-4 py-2">Negative</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Ketones</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="ketones" class="border p-1 w-full rounded" placeholder="Enter Ketones level"></td>
                                        <td class="border border-blue-700 px-4 py-2">Negative</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Bilirubin</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="bilirubin" class="border p-1 w-full rounded" placeholder="Enter Bilirubin level"></td>
                                        <td class="border border-blue-700 px-4 py-2">Negative</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Blood</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="blood" class="border p-1 w-full rounded" placeholder="Enter Blood level"></td>
                                        <td class="border border-blue-700 px-4 py-2">Negative</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Leukocytes (White Blood Cells)</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="leukocytes" class="border p-1 w-full rounded" placeholder="Enter Leukocytes level"></td>
                                        <td class="border border-blue-700 px-4 py-2">Negative</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2">Nitrates</td>
                                        <td class="border border-blue-700 px-4 py-2"><input type="text" id="nitrates" class="border p-1 w-full rounded" placeholder="Enter Nitrates level"></td>
                                        <td class="border border-blue-700 px-4 py-2">Negative</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2" colspan="3">
                                            <label for="urinalysis-photo" class="block text-lg font-semibold text-blue-900">Upload of Laboratory Results</label>
                                            <input type="file" id="urinalysis-photo" class="border p-1 w-full rounded">
                                            <img id="urinalysis-photo-preview" class="mt-2 max-w-xs" src="#" alt="Urinalysis Photo Preview">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="border border-blue-700 px-4 py-2" colspan="3">
                                            <label for="additional-urinalysis-photo" class="block text-lg font-semibold text-blue-900">Upload of Image Results</label>
                                            <input type="file" id="additional-urinalysis-photo" class="border p-1 w-full rounded">
                                            <img id="additional-urinalysis-photo-preview" class="mt-2 max-w-xs" src="#" alt="Additional Urinalysis Photo Preview">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="flex flex-col items-end mt-4 space-y-2">
                            <button id="labSubmitButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">Submit Credentials</button>
                            <button id="labViewHistoryButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">View Patient History</button>
                        </div>
                        <div class="h-20"></div> <!-- Added space at the bottom -->
                    </div>
        
                    <!-- Patient Selection Modal Structure -->
                    <div id="patientSelectionModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div class="bg-white rounded-lg shadow-lg w-80 max-h-[80vh] overflow-y-auto p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-2xl font-bold text-blue-900">Patient Lists</h3>
                                <button id="closePatientSelectionModal" class="text-black text-2xl font-bold">&times;</button>
                            </div>
                            <ul id="patientList" class="space-y-2"></ul>
                        </div>
                    </div>
        
                    <!-- View Patient History Modal Structure -->
                    <div id="viewHistoryModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div class="bg-white rounded-lg shadow-lg w-80 max-h-[80vh] overflow-y-auto p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-2xl font-bold text-blue-900">View Patient History</h3>
                                <button id="closeViewHistoryModal" class="text-black text-2xl font-bold">&times;</button>
                            </div>
                            <ul id="historyPatientList" class="space-y-2"></ul>
                        </div>
                    </div>
        
                    <!-- Summary Modal Structure -->
                    <div id="summaryModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto flex relative">
                            <button id="closeSummaryModal" class="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
                            <!-- Patient List -->
                            <div class="w-full p-4 border-r border-gray-300 overflow-y-auto">
                                <h3 class="text-2xl font-bold text-blue-900 mb-4">Patients</h3>
                                <ul id="summaryPatients"></ul>
                            </div>
                            <!-- Summary Content -->
                            <div class="w-full p-4 overflow-y-auto hidden" id="summaryModalContent">
                                <div id="summaryContent"></div>
                            </div>
                        </div>
                    </div>
        
                    <!-- Patient Modal Structure -->
                    <div id="patientModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto flex relative">
                            <button id="closeModal" class="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
                            <!-- Patient List -->
                            <div class="w-full p-4 border-r border-gray-300 overflow-y-auto">
                                <h3 class="text-2xl font-bold text-blue-900 mb-4">Patients</h3>
                                <ul id="patients"></ul>
                            </div>
                            <!-- Submit Credentials Content -->
                            <div class="w-full p-4 overflow-y-auto" id="submitContent">
                                <!-- This will be populated with the patient's data -->
                            </div>
                        </div>
                    </div>
                `;
        
            setActiveButtons(labBtn);
        
            // Function to check if the input values are within the reference range
            function checkReferenceRanges(input) {
                const ranges = {
                    wbc: [6000, 17000],
                    rbc: [3.90, 5.30],
                    hgb: [11.3, 14.1],
                    hct: [31, 41],
                    mcv: [70, 86],
                    mch: [23, 31],
                    mchc: [32, 36],
                    plateletCount: [150000, 400000],
                    neutrophils: [1000, 8500],
                    lymphocytes: [3000, 9500],
                    monocytes: [300, 850],
                    eosinophils: [165, 465],
                    basophils: [0, 140],
                    specificGravity: [1.001, 1.020],
                    ph: [5, 7],
                    protein: [0, 10],
                    glucose: [0, 0],
                    ketones: [0, 0],
                    bilirubin: [0, 0],
                    blood: [0, 0],
                    leukocytes: [0, 0],
                    nitrates: [0, 0],
                };
        
                const value = parseFloat(input.value);
                const [min, max] = ranges[input.id];
                if (!isNaN(value) && (value < min || value > max)) {
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            }
        
            // Add event listeners for input fields to check reference ranges while typing
            const inputFields = document.querySelectorAll('input[type="text"]');
            inputFields.forEach(input => {
                input.addEventListener('input', () => checkReferenceRanges(input));
            });
        
            document.getElementById("labSubmitButton").addEventListener("click", function() {
                const patients = JSON.parse(localStorage.getItem("patients")) || [];
                const patientListContainer = document.getElementById("historyPatientList");
                patientListContainer.innerHTML = ""; // Clear any previous list
        
                if (patients.length > 0) {
                    patients.forEach(patient => {
                        const listItem = document.createElement("li");
                        listItem.textContent = patient.name;
                        listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline", "p-2", "border-b", "border-gray-200");
                        listItem.addEventListener("click", () => {
                            // Save the form data to local storage
                            const formData = {
                                assessmentDate: document.getElementById("assessment-date").value,
                                wbc: document.getElementById("wbc").value,
                                rbc: document.getElementById("rbc").value,
                                hgb: document.getElementById("hgb").value,
                                hct: document.getElementById("hct").value,
                                mcv: document.getElementById("mcv").value,
                                mch: document.getElementById("mch").value,
                                mchc: document.getElementById("mchc").value,
                                plateletCount: document.getElementById("plateletCount").value,
                                neutrophils: document.getElementById("neutrophils").value,
                                lymphocytes: document.getElementById("lymphocytes").value,
                                monocytes: document.getElementById("monocytes").value,
                                eosinophils: document.getElementById("eosinophils").value,
                                basophils: document.getElementById("basophils").value,
                                specificGravity: document.getElementById("specificGravity").value,
                                ph: document.getElementById("ph").value,
                                protein: document.getElementById("protein").value,
                                glucose: document.getElementById("glucose").value,
                                ketones: document.getElementById("ketones").value,
                                bilirubin: document.getElementById("bilirubin").value,
                                blood: document.getElementById("blood").value,
                                leukocytes: document.getElementById("leukocytes").value,
                                nitrates: document.getElementById("nitrates").value,
                            };
        
                            // Convert photos to data URLs
                            const cbcPhotoFile = document.getElementById("cbc-photo").files[0];
                            const additionalCbcPhotoFile = document.getElementById("additional-cbc-photo").files[0];
                            const urinalysisPhotoFile = document.getElementById("urinalysis-photo").files[0];
                            const additionalUrinalysisPhotoFile = document.getElementById("additional-urinalysis-photo").files[0];
        
                            const convertAndSavePhoto = (file, type) => {
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = function(e) {
                                        formData[type] = e.target.result;
                                        saveFormData(patient, formData);
                                    };
                                    reader.readAsDataURL(file);
                                } else {
                                    saveFormData(patient, formData);
                                }
                            };
        
                            convertAndSavePhoto(cbcPhotoFile, 'cbcPhoto');
                            convertAndSavePhoto(additionalCbcPhotoFile, 'additionalCbcPhoto');
                            convertAndSavePhoto(urinalysisPhotoFile, 'urinalysisPhoto');
                            convertAndSavePhoto(additionalUrinalysisPhotoFile, 'additionalUrinalysisPhoto');
        
                            // Clear the image previews and file inputs
                            document.getElementById("cbc-photo-preview").src = "#";
                            document.getElementById("additional-cbc-photo-preview").src = "#";
                            document.getElementById("urinalysis-photo-preview").src = "#";
                            document.getElementById("additional-urinalysis-photo-preview").src = "#";
                            document.getElementById("cbc-photo").value = "";
                            document.getElementById("additional-cbc-photo").value = "";
                            document.getElementById("urinalysis-photo").value = "";
                            document.getElementById("additional-urinalysis-photo").value = "";
                        });
                        patientListContainer.appendChild(listItem);
                    });
                } else {
                    patientListContainer.innerHTML = "<p>No patients found.</p>";
                }
        
                // Show the view history modal
                document.getElementById("viewHistoryModal").classList.remove("hidden");
        
                // Reset border colors after submitting
                inputFields.forEach(input => {
                    input.style.borderColor = '';
                });
            });
        
            function saveFormData(patient, formData) {
                localStorage.setItem(`labResultsData_${patient.id}`, JSON.stringify(formData));
                alert(`Credentials submitted to ${patient.name}`);
                // Hide the view history modal
                document.getElementById("viewHistoryModal").classList.add("hidden");
            }
        
            document.getElementById("labViewHistoryButton").addEventListener("click", function() {
                const patients = JSON.parse(localStorage.getItem("patients")) || [];
                const patientListContainer = document.getElementById("historyPatientList");
                patientListContainer.innerHTML = ""; // Clear any previous list
        
                if (patients.length > 0) {
                    patients.forEach(patient => {
                        const listItem = document.createElement("li");
                        listItem.textContent = patient.name;
                        listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline", "p-2", "border-b", "border-gray-200");
                        listItem.addEventListener("click", () => {
                            viewPatientCredentials(patient);
                            // Hide the view history modal
                            document.getElementById("viewHistoryModal").classList.add("hidden");
                            // Show the summary modal
                            document.getElementById("summaryModal").classList.remove("hidden");
                        });
                        patientListContainer.appendChild(listItem);
                    });
                } else {
                    patientListContainer.innerHTML = "<p>No patients found.</p>";
                }
        
                // Show the view history modal
                document.getElementById("viewHistoryModal").classList.remove("hidden");
            });
        
            document.getElementById("closePatientSelectionModal").addEventListener("click", function() {
                // Hide the modal
                document.getElementById("patientSelectionModal").classList.add("hidden");
            });
        
            document.getElementById("closeViewHistoryModal").addEventListener("click", function() {
                // Hide the modal
                document.getElementById("viewHistoryModal").classList.add("hidden");
            });
        
            document.getElementById("closeModal").addEventListener("click", function() {
                // Clear input fields
                clearInputFields();
                // Hide the modal
                document.getElementById("patientModal").classList.add("hidden");
            });
        
            document.getElementById("closeSummaryModal").addEventListener("click", function() {
                // Clear input fields
                clearInputFields();
                // Hide the modal
                document.getElementById("summaryModal").classList.add("hidden");
                // Clear the summary content
                document.getElementById("summaryModalContent").innerHTML = "";
                document.getElementById("summaryModalContent").classList.add("hidden");
                document.querySelector("#summaryModal .w-full.p-4.border-r").classList.remove("hidden");
            });
        
            // Add event listener to display the uploaded image
            document.getElementById("cbc-photo").addEventListener("change", function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById("cbc-photo-preview").src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        
            // Add event listener to display the uploaded image
            document.getElementById("additional-cbc-photo").addEventListener("change", function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById("additional-cbc-photo-preview").src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        
            // Add event listener to display the uploaded image
            document.getElementById("urinalysis-photo").addEventListener("change", function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById("urinalysis-photo-preview").src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        
            // Add event listener to display the uploaded image
            document.getElementById("additional-urinalysis-photo").addEventListener("change", function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById("additional-urinalysis-photo-preview").src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        
            // Function to view patient credentials
            function viewPatientCredentials(patient) {
                // Retrieve saved data from local storage specific to the patient
                const patientDataKey = `labResultsData_${patient.id}`;
                const data = JSON.parse(localStorage.getItem(patientDataKey)) || {};
        
                // Generate the summary content
                const summaryContent = generateSummaryContent(patient, data);
        
                // Populate the summary modal content
                document.getElementById("summaryModalContent").innerHTML = summaryContent;
        
                // Show the summary content
                document.getElementById("summaryModalContent").classList.remove("hidden");
                document.querySelector("#summaryModal .w-full.p-4.border-r").classList.add("hidden");
            }
        
            function generateSummaryContent(patient, data) {
                return `
                    <div class="p-4 bg-gray rounded-lg shadow-md h-full w-full overflow-y-auto">
                        <h3 class="text-2xl font-bold text-blue-900 mb-4">Patient Summary for ${patient.name}</h3>
                        <div class="bg-gray-100 p-4 rounded-lg">
                            <div class="overflow-x-auto">
                                <div class="bg-gray-100 rounded-lg p-4 mb-4">
                                    <label class="block text-lg font-semibold text-blue-900">Date of Assessment</label>
                                    <p>${data.assessmentDate || 'N/A'}</p>
                                </div>
                                <table class="min-w-full border border-blue-700 mt-2">
                                    <thead>
                                        <tr>
                                            <th class="px-4 py-2 text-left text-2xl">Complete Blood Count</th>
                                            <th class="px-4 py-2 text-left text-gray-800">Results</th>
                                            <th class="px-4 py-2 text-left text-gray-800">Reference Range</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-blue-700">
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">White Blood Cell (WBC)</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.wbc || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">6,000–17,000 mm³</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Red Blood Cell (RBC)</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.rbc || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">3.90–5.30 million/mm³</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Hemoglobin (HGB)</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.hgb || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">11.3–14.1 g/dL</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Hematocrit (HCT)</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.hct || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">31% – 41%</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Mean Corpuscular Volume (MCV)</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.mcv || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">70–86 fL</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Mean Corpuscular Hemoglobin (MCH)</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.mch || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">23–31 pg</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Mean Corpuscular Hemoglobin Concentration (MCHC)</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.mchc || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">32–36 g/dL RBC</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Platelet Count</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.plateletCount || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">150,000–400,000 platelets/mm³</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Neutrophils</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.neutrophils || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">1,000–8,500 mm³</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Lymphocytes</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.lymphocytes || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">3,000–9,500 mm³</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Monocytes</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.monocytes || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">300–850 mm³</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Eosinophils</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.eosinophils || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">165–465 mm³</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Basophils</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.basophils || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">0–140 mm³</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Photo of CBC Lab Results</td>
                                            <td class="border border-blue-700 px-4 py-2" colspan="2">
                                                ${data.cbcPhoto ? `<img src="${data.cbcPhoto}" alt="CBC Photo" class="w-full h-auto">` : 'N/A'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Image Results</td>
                                            <td class="border border-blue-700 px-4 py-2" colspan="2">
                                                ${data.additionalCbcPhoto ? `<img src="${data.additionalCbcPhoto}" alt="Additional CBC Photo" class="w-full h-auto">` : 'N/A'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br>
                                <div class="bg-gray-100 rounded-lg p-4 mb-4">
                                    <label class="block text-lg font-semibold text-blue-900">Date of Assessment</label>
                                    <p>${data.assessmentDate || 'N/A'}</p>
                                </div>
                                <!-- Urinalysis Table -->
                                <table class="min-w-full border border-blue-700 mt-2">
                                    <thead>
                                        <tr>
                                            <th class="px-4 py-2 text-left text-2xl">Urinalysis</th>
                                            <th class="px-4 py-2 text-left text-gray-800">Results</th>
                                            <th class="px-4 py-2 text-left text-gray-800">Reference Range</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-blue-700">
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Specific Gravity</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.specificGravity || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">1.001-1.020</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">pH</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.ph || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">5 to 7</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Protein</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.protein || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">Less than 10 mg/dL</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Glucose</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.glucose || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">Negative</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Ketones</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.ketones || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">Negative</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Bilirubin</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.bilirubin || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">Negative</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Blood</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.blood || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">Negative</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Leukocytes (White Blood Cells)</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.leukocytes || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">Negative</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Nitrates</td>
                                            <td class="border border-blue-700 px-4 py-2">${data.nitrates || 'N/A'}</td>
                                            <td class="border border-blue-700 px-4 py-2">Negative</td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Photo of Urinalysis Lab Results</td>
                                            <td class="border border-blue-700 px-4 py-2" colspan="2">
                                                ${data.urinalysisPhoto ? `<img src="${data.urinalysisPhoto}" alt="Urinalysis Photo" class="w-full h-auto">` : 'N/A'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="border border-blue-700 px-4 py-2">Image Results</td>
                                            <td class="border border-blue-700 px-4 py-2" colspan="2">
                                                ${data.additionalUrinalysisPhoto ? `<img src="${data.additionalUrinalysisPhoto}" alt="Additional Urinalysis Photo" class="w-full h-auto">` : 'N/A'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            }
        
            // Function to clear input fields
            function clearInputFields() {
                const inputFields = document.querySelectorAll('input');
                inputFields.forEach(field => {
                    field.value = '';
                    field.style.borderColor = ''; // Reset border color
                });
            }
        }
        
        
        
        
        
        













           
        function showMAR() {
            const content = document.getElementById('content');
            content.innerHTML = `
                <div class="p-4 bg-gray rounded-lg shadow-md h-[100vh] w-full overflow-y-auto">
                    <div>
                        <label class="block text-blue-900 text-sm font-medium">Administration Date</label>
                        <input type="date" id="administrationDate" class="border border-blue-700 p-2 rounded mb-4 w-full">
                    </div>
        
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <label class="block text-blue-900 text-sm font-medium">Attending Physician</label>
                            <input type="text" id="attendingPhysician1" class="border border-blue-700 p-2 rounded w-full mb-4">
                        </div>
                        <div>
                            <label class="block text-blue-900 text-sm font-medium">Prescription</label>
                            <input type="text" id="prescription1" class="border border-blue-700 p-2 rounded w-full mb-4">
                        </div>
                        <div>
                            <label class="block text-blue-900 text-sm font-medium">Duration</label>
                            <input type="text" id="duration1" class="border border-blue-700 p-2 rounded w-full mb-4">
                        </div>
                    </div>
        
                    <div class="grid grid-cols-2 gap-4">
                        ${generateMedicationTableSection("Medication Table", 4)}
                        ${generateTimeTableSection("Time Table", 4)}
                    </div>
        
                    <div class="grid grid-cols-3 gap-4 mt-6">
                        <div>
                            <label class="block text-blue-900 text-sm font-medium">Attending Physician</label>
                            <input type="text" id="attendingPhysician2" class="border border-blue-700 p-2 rounded w-full mb-4">
                        </div>
                        <div>
                            <label class="block text-blue-900 text-sm font-medium">Prescription</label>
                            <input type="text" id="prescription2" class="border border-blue-700 p-2 rounded w-full mb-4">
                        </div>
                        <div>
                            <label class="block text-blue-900 text-sm font-medium">Duration</label>
                            <input type="text" id="duration2" class="border border-blue-700 p-2 rounded w-full mb-4">
                        </div>
                    </div>
        
                    <div class="grid grid-cols-2 gap-4">
                        ${generateMedicationTableSection("Medication Table", 4)}
                        ${generateTimeTableSection("Time Table", 4)}
                    </div>
        
                    <div class="flex flex-col items-end mt-4 space-y-2">
                        <button id="MARsubmitButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">Submit Credentials</button>
                        <button id="MARviewHistoryButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">View Patient History</button>
                    </div>
        
                    <div class="h-20"></div>
                </div>
        
                <div id="modal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 relative overflow-y-auto max-h-[80vh]" id="modalContent">
                        <button id="closeModal" class="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
                        <div class="overflow-y-auto" id="patientListContainer">
                            <h3 class="text-2xl font-bold text-blue-900 mb-4 text-center" id="modalTitle">Patients</h3>
                            <ul id="patientList" class="space-y-2"></ul>
                        </div>
                        <div id="patientHistory" class="hidden overflow-y-auto"></div>
                    </div>
                </div>
            `;
        
            function generateMedicationTableSection(title, rowCount) {
                let rows = '';
                for (let i = 0; i < rowCount; i++) {
                    rows += `
                        <tr>
                            <td class="border border-blue-700 px-4 py-2">
                                <textarea class="border p-1 w-full rounded" placeholder="Enter medication"></textarea>
                            </td>
                            <td class="border border-blue-700 px-4 py-2">
                                <textarea class="border p-1 w-full rounded" placeholder="Enter dosage"></textarea>
                            </td>
                            <td class="border border-blue-700 px-4 py-2">
                                <textarea class="border p-1 w-full rounded" placeholder="Enter route"></textarea>
                            </td>
                            <td class="border border-blue-700 px-4 py-2">
                                <textarea class="border p-1 w-full rounded" placeholder="Enter frequency"></textarea>
                            </td>
                        </tr>
                    `;
                }
                return `
                    <div>
                        <label class="block text-blue-900 text-sm font-medium">${title}</label>
                        <table class="w-full border border-blue-700 mt-2">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2">Medication</th>
                                    <th class="px-4 py-2">Dosage</th>
                                    <th class="px-4 py-2">Route</th>
                                    <th class="px-4 py-2">Frequency</th>
                                </tr>
                            </thead>
                            <tbody class="text-blue-700">
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        
            function generateTimeTableSection(title, rowCount) {
                let rows = '';
                for (let i = 0; i < rowCount; i++) {
                    rows += `
                        <tr>
                            <td class="border border-blue-700 px-4 py-2">
                                <input type="time" class="border p-1 w-full rounded" placeholder="Enter time">
                            </td>
                            <td class="border border-blue-700 px-4 py-2">
                                <textarea class="border p-1 w-full rounded" placeholder="Administered by"></textarea>
                            </td>
                        </tr>
                    `;
                }
                return `
                    <div>
                        <label class="block text-blue-900 text-sm font-medium">${title}</label>
                        <table class="w-full border border-blue-700 mt-2">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2">Time</th>
                                    <th class="px-4 py-2">Administered By</th>
                                </tr>
                            </thead>
                            <tbody class="text-blue-700">
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        
            document.getElementById("MARsubmitButton").addEventListener("click", function() {
                const patients = JSON.parse(localStorage.getItem("patients")) || [];
                const patientListContainer = document.getElementById("patientList");
                patientListContainer.innerHTML = "";
        
                if (patients.length > 0) {
                    patients.forEach(patient => {
                        const listItem = document.createElement("li");
                        listItem.textContent = patient.name;
                        listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline");
                        listItem.addEventListener("click", () => {
                            const data = {
                                administrationDate: document.getElementById('administrationDate').value,
                                attendingPhysician1: document.getElementById('attendingPhysician1').value,
                                prescription1: document.getElementById('prescription1').value,
                                duration1: document.getElementById('duration1').value,
                                medicationTable1: collectMedicationTableData(document.querySelectorAll('table')[0]),
                                timeTable1: collectTimeTableData(document.querySelectorAll('table')[1]),
                                attendingPhysician2: document.getElementById('attendingPhysician2').value,
                                prescription2: document.getElementById('prescription2').value,
                                duration2: document.getElementById('duration2').value,
                                medicationTable2: collectMedicationTableData(document.querySelectorAll('table')[2]),
                                timeTable2: collectTimeTableData(document.querySelectorAll('table')[3])
                            };
        
                            const patientDataKey = `MARData_${patient.id}`;
                            const existingData = JSON.parse(localStorage.getItem(patientDataKey)) || {};
                            const updatedData = {
                                ...existingData,
                                ...data
                            };
                            localStorage.setItem(patientDataKey, JSON.stringify(updatedData));
                            console.log(`Data saved for ${patient.name}:`, updatedData);
        
                            alert(`Credentials submitted to ${patient.name}`);
                            document.getElementById("modal").classList.add("hidden");
                            clearForm(); // Clear the form after submitting data
                        });
                        patientListContainer.appendChild(listItem);
                    });
                } else {
                    patientListContainer.innerHTML = "<p>No patients found.</p>";
                }
        
                document.getElementById("modal").classList.remove("hidden");
                document.getElementById("modalTitle").textContent = "Submit Credentials";
                document.getElementById("patientHistory").classList.add("hidden");
                document.getElementById("patientListContainer").classList.remove("hidden");
            });
        
            function showPatientHistory(patient) {
                const patientDataKey = `MARData_${patient.id}`;
                const data = JSON.parse(localStorage.getItem(patientDataKey)) || {};
                console.log(`Data retrieved for ${patient.name}:`, data);
        
                if (!data || Object.keys(data).length === 0) {
                    alert(`No history found for ${patient.name}.`);
                    return;
                }
        
                const summaryContent = generateSummaryContent(patient, data);
                document.getElementById("patientHistory").innerHTML = summaryContent;
                document.getElementById("patientHistory").classList.remove("hidden");
                document.getElementById("patientListContainer").classList.add("hidden");
            }
        
            document.getElementById("MARviewHistoryButton").addEventListener("click", function() {
                const patients = JSON.parse(localStorage.getItem("patients")) || [];
                const patientListContainer = document.getElementById("patientList");
                patientListContainer.innerHTML = "";
        
                if (patients.length > 0) {
                    patients.forEach(patient => {
                        const listItem = document.createElement("li");
                        listItem.textContent = patient.name;
                        listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline");
                        listItem.addEventListener("click", () => showPatientHistory(patient));
                        patientListContainer.appendChild(listItem);
                    });
                } else {
                    patientListContainer.innerHTML = "<p>No patients found.</p>";
                }
        
                document.getElementById("modal").classList.remove("hidden");
                document.getElementById("modalTitle").textContent = "View Patient History";
                document.getElementById("patientHistory").classList.add("hidden");
                document.getElementById("patientListContainer").classList.remove("hidden");
            });
        
            document.getElementById("closeModal").addEventListener("click", function() {
                clearForm();
                document.getElementById("modal").classList.add("hidden");
                document.getElementById("patientHistory").classList.add("hidden");
                document.getElementById("patientListContainer").classList.remove("hidden");
            });
        
            function collectMedicationTableData(table) {
                const rows = table.querySelectorAll('tbody tr');
                const data = [];
        
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td textarea');
                    if (cells.length === 4) {
                        data.push({
                            medication: cells[0].value.trim(),
                            dosage: cells[1].value.trim(),
                            route: cells[2].value.trim(),
                            frequency: cells[3].value.trim()
                        });
                    }
                });
        
                return data;
            }
        
            function collectTimeTableData(table) {
                const rows = table.querySelectorAll('tbody tr');
                const data = [];
        
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length === 2) {
                        data.push({
                            time: cells[0].querySelector('input').value.trim(),
                            administeredBy: cells[1].querySelector('textarea').value.trim()
                        });
                    }
                });
        
                return data;
            }
        
            function generateSummaryContent(patient, data) {
                return `
                    <div class="p-4 bg-gray rounded-lg shadow-md h-full w-full overflow-y-auto">
                        <h3 class="text-2xl font-bold text-blue-900 mb-4">Patient Summary for ${patient.name}</h3>
                        <div>
                            <label class="block text-blue-900 text-sm font-medium">Administration Date</label>
                            <p>${data.administrationDate || 'N/A'}</p>
                        </div>
        
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Attending Physician</label>
                                <p>${data.attendingPhysician1 || 'N/A'}</p>
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Prescription</label>
                                <p>${data.prescription1 || 'N/A'}</p>
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Duration</label>
                                <p>${data.duration1 || 'N/A'}</p>
                            </div>
                        </div>
        
                        <div class="grid grid-cols-2 gap-4">
                            ${generateSummaryMedicationTableSection(data.medicationTable1 || [])}
                            ${generateSummaryTimeTableSection(data.timeTable1 || [])}
                        </div>
        
                        <div class="grid grid-cols-3 gap-4 mt-6">
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Attending Physician</label>
                                <p>${data.attendingPhysician2 || 'N/A'}</p>
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Prescription</label>
                                <p>${data.prescription2 || 'N/A'}</p>
                            </div>
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">Duration</label>
                                <p>${data.duration2 || 'N/A'}</p>
                            </div>
                        </div>
        
                        <div class="grid grid-cols-2 gap-4">
                            ${generateSummaryMedicationTableSection(data.medicationTable2 || [])}
                            ${generateSummaryTimeTableSection(data.timeTable2 || [])}
                        </div>
                    </div>
                `;
            }
        
            function generateSummaryMedicationTableSection(data) {
                let rows = '';
                data.forEach(item => {
                    rows += `
                        <tr>
                            <td class="border border-blue-700 px-4 py-2">
                                <p>${item.medication || ''}</p>
                            </td>
                            <td class="border border-blue-700 px-4 py-2">
                                <p>${item.dosage || ''}</p>
                            </td>
                            <td class="border border-blue-700 px-4 py-2">
                                <p>${item.route || ''}</p>
                            </td>
                            <td class="border border-blue-700 px-4 py-2">
                                <p>${item.frequency || ''}</p>
                            </td>
                        </tr>
                    `;
                });
        
                return `
                    <div class="overflow-x-auto">
                        <label class="block text-blue-900 text-sm font-medium mb-2">Medication Table</label>
                        <table class="w-full table-auto border border-blue-700 text-sm">
                            <thead class="bg-blue-100">
                                <tr>
                                    <th class="px-4 py-2 border border-blue-700 text-left">Medication</th>
                                    <th class="px-4 py-2 border border-blue-700 text-left">Dosage</th>
                                    <th class="px-4 py-2 border border-blue-700 text-left">Route</th>
                                    <th class="px-4 py-2 border border-blue-700 text-left">Frequency</th>
                                </tr>
                            </thead>
                            <tbody class="text-blue-700">
                                ${rows || `<tr><td colspan="4" class="text-center p-4">No data available</td></tr>`}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        
            function generateSummaryTimeTableSection(data) {
                let rows = '';
                data.forEach(item => {
                    rows += `
                        <tr>
                            <td class="border border-blue-700 px-4 py-2">
                                <p>${item.time || ''}</p>
                            </td>
                            <td class="border border-blue-700 px-4 py-2">
                                <p>${item.administeredBy || ''}</p>
                            </td>
                        </tr>
                    `;
                });
        
                return `
                    <div class="overflow-x-auto">
                        <label class="block text-blue-900 text-sm font-medium mb-2">Time Table</label>
                        <table class="w-full table-auto border border-blue-700 text-sm">
                            <thead class="bg-blue-100">
                                <tr>
                                    <th class="px-4 py-2 border border-blue-700 text-left">Time</th>
                                    <th class="px-4 py-2 border border-blue-700 text-left">Administered By</th>
                                </tr>
                            </thead>
                            <tbody class="text-blue-700">
                                ${rows || `<tr><td colspan="2" class="text-center p-4">No data available</td></tr>`}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        
            function clearForm() {
                const inputFields = document.querySelectorAll('input, textarea');
                inputFields.forEach(field => {
                    field.value = '';
                });
            }
        
            // Ensure marBtn is defined
            const marBtn = document.getElementById('marBtn');
            console.log("marBtn:", marBtn); // Debugging line
            setActiveButtons(marBtn);
        }
        
        
        
        
        
        




























                    // Updated generateTableSection function to accept row count
                    function generateTableSection(title, isMedicationTable, rowCount) {
                        return `
                            <div>
                                <label class="block text-blue-900 text-sm font-medium">${title}</label>
                                <div class="overflow-x-auto mt-2">
                                    <table class="w-full border-collapse border border-blue-700">
                                        <thead>
                                            <tr class="bg-gray-100 border-b border-blue-700">
                                                ${isMedicationTable ? `
                                                    <th class="p-2 text-center border border-blue-700">Medication</th>
                                                    <th class="p-2 text-center border border-blue-700">Dosage</th>
                                                    <th class="p-2 text-center border border-blue-700">Route</th>
                                                    <th class="p-2 text-center border border-blue-700">Frequency</th>
                                                ` : `
                                                    <th class="p-2 text-center border border-blue-700">Time</th>
                                                    <th class="p-2 text-center border border-blue-700">Administered by</th>
                                                `}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${isMedicationTable ? generateMedicationRows(rowCount) : generateTimeRows(rowCount)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `;
                    }        
                    
                    // Function to generate rows for the Medication Table
                    function generateMedicationRows(num) {
                        let rows = '';
                        for (let i = 0; i < num; i++) {
                            rows += `
                                <tr class="border-b border-blue-700">
                                    <td class="p-3 text-center border border-blue-700"><input type="text" class="border border-blue-700 p-2 rounded w-full"></td>
                                    <td class="p-3 text-center border border-blue-700"><input type="text" class="border border-blue-700 p-2 rounded w-full"></td>
                                    <td class="p-3 text-center border border-blue-700"><input type="text" class="border border-blue-700 p-2 rounded w-full"></td>
                                    <td class="p-3 text-center border border-blue-700"><input type="text" class="border border-blue-700 p-2 rounded w-full"></td>
                                </tr>
                            `;
                        }
                        return rows;
                    }
                    
                    // Function to generate rows for the Time Table
                    function generateTimeRows(num) {
                        let rows = '';
                        for (let i = 0; i < num; i++) {
                            rows += `
                                <tr class="border-b border-blue-700">
                                    <td class="p-3 text-center border border-blue-700">
                                        <div class="grid grid-cols-1 gap-2">
                                            <input type="time" class="border border-blue-700 p-2 rounded w-full">
                                        </div>
                                    </td>
                                    <td class="p-3 text-center border border-blue-700">
                                        <div class="grid grid-cols-1 gap-2">
                                            <input type="text" class="border border-blue-700 p-2 rounded w-full">
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }
                        return rows;
                    } 

                    function showCDSS() {
                        content.innerHTML = `
                            <div class="p-4 bg-gray-100 rounded-lg shadow-md h-full w-full flex flex-col items-center justify-center overflow-y-auto">
                                <h2 class="text-3xl font-semibold text-black mb-6">Clinical Decision Support System</h2>
                    
                                <!-- Diagnosis Selection -->
                                <div class="mb-6 w-full max-w-2xl">
                                    <label for="diagnosisSelect" class="block text-blue-900 text-sm font-bold mb-2">Possible diagnoses to patient:</label>
                                    <select id="diagnosisSelect" class="border border-blue-700 p-2 rounded w-full">
                                        <option value="">SELECT</option>
                                        <option value="Dengue">Dengue</option>
                                    </select>
                                </div>
                    
                                <!-- Buttons -->
                                <div class="flex gap-4 mb-6">
                                    <button id="submitButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">SUBMIT</button>
                                    <button id="viewHistoryButton" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">View Patient History</button>
                                </div>
                    
                                <!-- Display area for nursing interventions and decision-making -->
                                <div id="interventionsArea" class="mt-6 w-full max-w-2xl grid grid-cols-1 gap-8 mb-8"></div>
                            </div>
                    
                            <!-- Modal Structure -->
                            <div id="summaryModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                                <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 relative overflow-y-auto max-h-[90vh]">
                                    <button id="closeSummaryModal" class="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
                                    <!-- Patient List -->
                                    <div class="w-full p-4 border-r border-gray-300 overflow-y-auto">
                                        <h3 class="text-2xl font-bold text-blue-900 mb-4">Patients</h3>
                                        <ul id="summaryPatients"></ul>
                                    </div>
                                    <!-- Summary Content -->
                                    <div class="w-full p-4 overflow-y-auto hidden" id="summaryModalContent">
                                        <div id="summaryContent"></div>
                                    </div>
                                </div>
                            </div>
                    
                            <!-- Patient Modal Structure -->
                            <div id="patientModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                                <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 relative overflow-y-auto max-h-[90vh]" id="modalContent">
                                    <button id="closeModal" class="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
                                    <!-- Patient List -->
                                    <div class="overflow-y-auto" id="patientListContainer">
                                        <h3 class="text-2xl font-bold text-blue-900 mb-4 text-center" id="modalTitle">Patients</h3>
                                        <ul id="patientList" class="space-y-2"></ul>
                                    </div>
                                    <!-- Patient History -->
                                    <div id="patientHistory" class="hidden overflow-y-auto"></div>
                                </div>
                            </div>
                        `;
                    
                        setActiveButtons(cdssBtn);
                    
                        // Add event listener for the submit button
                        document.getElementById("submitButton").addEventListener("click", () => {
                            // Show the patient list modal
                            const patients = JSON.parse(localStorage.getItem("patients")) || [];
                            const patientListContainer = document.getElementById("patientList");
                            patientListContainer.innerHTML = ""; // Clear any previous list
                    
                            if (patients.length > 0) {
                                patients.forEach(patient => {
                                    const listItem = document.createElement("li");
                                    listItem.textContent = patient.name;
                                    listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline");
                                    listItem.addEventListener("click", () => {
                                        alert(`The credentials have been submitted to ${patient.name}`);
                                        // Clear the form and remove the message
                                        clearInputFields();
                                        document.getElementById("interventionsArea").innerHTML = "";
                                        document.getElementById("patientModal").classList.add("hidden");
                                    });
                                    patientListContainer.appendChild(listItem);
                                });
                            } else {
                                patientListContainer.innerHTML = "<p>No patients found.</p>";
                            }
                    
                            // Show the modal
                            document.getElementById("patientModal").classList.remove("hidden");
                        });
                    
                        // Add event listener for the view history button
                        document.getElementById("viewHistoryButton").addEventListener("click", function() {
                            const patients = JSON.parse(localStorage.getItem("patients")) || [];
                            const patientListContainer = document.getElementById("summaryPatients");
                            patientListContainer.innerHTML = ""; // Clear any previous list
                    
                            if (patients.length > 0) {
                                patients.forEach(patient => {
                                    const listItem = document.createElement("li");
                                    listItem.textContent = patient.name;
                                    listItem.classList.add("cursor-pointer", "text-blue-600", "hover:underline");
                                    listItem.addEventListener("click", () => viewPatientCredentials(patient));
                                    patientListContainer.appendChild(listItem);
                                });
                            } else {
                                patientListContainer.innerHTML = "<p>No patients found.</p>";
                            }
                    
                            // Show the modal
                            document.getElementById("summaryModal").classList.remove("hidden");
                        });
                    
                        document.getElementById("closeModal").addEventListener("click", function() {
                            // Hide the modal
                            document.getElementById("patientModal").classList.add("hidden");
                        });
                    
                        document.getElementById("closeSummaryModal").addEventListener("click", function() {
                            // Hide the modal
                            document.getElementById("summaryModal").classList.add("hidden");
                            // Clear the summary content
                            document.getElementById("summaryModalContent").innerHTML = "";
                            document.getElementById("summaryModalContent").classList.add("hidden");
                            document.querySelector("#summaryModal .w-full.p-4.border-r").classList.remove("hidden");
                        });
                    
                        // Add event listener for the diagnosis selection
                        document.getElementById("diagnosisSelect").addEventListener("change", function() {
                            const selectedDiagnosis = this.value;
                            const interventionsArea = document.getElementById("interventionsArea");
                    
                            if (selectedDiagnosis === "Dengue") {
                                interventionsArea.innerHTML = `
                                    <div>
                                        <h3 class="text-lg font-bold text-blue-900 mb-4">Nursing Interventions:</h3>
                                        <ul class="list-disc list-inside">
                                            <li>Monitor vital signs every 1–4 hours.</li>
                                            <li>Assess for warning signs (e.g., abdominal pain, bleeding, vomiting).</li>
                                            <li>Initiate IV fluid therapy as needed.</li>
                                            <li>Educate patient and family on symptoms to watch for.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-bold text-blue-900 mb-4 mt-6">Decision-Making:</h3>
                                        <ul class="list-disc list-inside">
                                            <li>Classify dengue severity (no warning signs, with warning signs, severe dengue).</li>
                                            <li>Decide on fluid management based on hydration status and hematocrit.</li>
                                            <li>If platelet count &lt;50,000/mm³ with bleeding or &lt;20,000/mm³ even without bleeding, refer for hospitalization and possible transfusion.</li>
                                            <li>Refer immediately to higher facility if signs of severe dengue or shock appear.</li>
                                        </ul>
                                        <div class="h-20"></div>
                                    </div>
                                `;
                            } else {
                                interventionsArea.innerHTML = "";
                            }
                        });
                    
                        // Function to view patient credentials
                        function viewPatientCredentials(patient) {
                            // Retrieve saved data from local storage specific to the patient
                            const patientDataKey = `cdssData_${patient.id}`;
                            const data = JSON.parse(localStorage.getItem(patientDataKey)) || {};
                    
                            // Generate the summary content
                            const summaryContent = generateSummaryContent(patient, data);
                    
                            // Populate the summary modal content
                            document.getElementById("summaryModalContent").innerHTML = summaryContent;
                    
                            // Show the summary content
                            document.getElementById("summaryModalContent").classList.remove("hidden");
                            document.querySelector("#summaryModal .w-full.p-4.border-r").classList.add("hidden");
                        }
                    
                        function generateSummaryContent(patient, data) {
                            return `
                                <div class="p-4 bg-gray-100 rounded-lg shadow-md h-full w-full overflow-y-auto mb-8">
                                    <h3 class="text-2xl font-bold text-blue-900 mb-4 text-center">Patient Summary for ${patient.name}</h3>
                                    <!-- Diagnosis Selection -->
                                    <div class="mb-6 w-full max-w-md">
                                        <label class="block text-blue-900 text-sm font-bold mb-2">Possible diagnoses to patient:</label>
                                        <p class="text-center">${data.diagnosis || 'N/A'}</p>
                                    </div>
                    
                                    <!-- Nursing Interventions and Decision-Making -->
                                    ${data.diagnosis === 'Dengue' ? `
                                    <div class="grid grid-cols-1 gap-8">
                                        <div>
                                            <h3 class="text-lg font-bold text-blue-900 mb-4">Nursing Interventions:</h3>
                                            <ul class="list-disc list-inside">
                                                <li>Monitor vital signs every 1–4 hours.</li>
                                                <li>Assess for warning signs (e.g., abdominal pain, bleeding, vomiting).</li>
                                                <li>Initiate IV fluid therapy as needed.</li>
                                                <li>Educate patient and family on symptoms to watch for.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="text-lg font-bold text-blue-900 mb-4 mt-6">Decision-Making:</h3>
                                            <ul class="list-disc list-inside">
                                                <li>Classify dengue severity (no warning signs, with warning signs, severe dengue).</li>
                                                <li>Decide on fluid management based on hydration status and hematocrit.</li>
                                                <li>If platelet count &lt;50,000/mm³ with bleeding or &lt;20,000/mm³ even without bleeding, refer for hospitalization and possible transfusion.</li>
                                                <li>Refer immediately to higher facility if signs of severe dengue or shock appear.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                            `;
                        }
                    
                        // Function to clear input fields
                        function clearInputFields() {
                            const inputFields = document.querySelectorAll('input, select');
                            inputFields.forEach(field => {
                                if (field.type === 'checkbox' || field.type === 'radio') {
                                    field.checked = false;
                                } else {
                                    field.value = '';
                                }
                            });
                        }
                    
                        // Function to set the diagnosis in local storage
                        function setDiagnosis(patientId, diagnosis) {
                            const patientDataKey = `cdssData_${patientId}`;
                            const data = JSON.parse(localStorage.getItem(patientDataKey)) || {};
                            data.diagnosis = diagnosis;
                            localStorage.setItem(patientDataKey, JSON.stringify(data));
                        }
                    
                        // Add event listener for the submit button to set the diagnosis
                        document.getElementById("submitButton").addEventListener("click", () => {
                            const selectedDiagnosis = document.getElementById("diagnosisSelect").value;
                            const patients = JSON.parse(localStorage.getItem("patients")) || [];
                            if (patients.length > 0 && selectedDiagnosis) {
                                patients.forEach(patient => {
                                    setDiagnosis(patient.id, selectedDiagnosis);
                                });
                            }
                        });
                    }
                    

                    function showFollowUp() {
                        content.innerHTML = `
                            <div class="p-4 bg-gray rounded-lg shadow-md h-[100vh] w-full overflow-y-auto">
                                <h2 class="text-4xl font-semibold text-blue-900 mb-6">Book an Appointment</h2>
                    
                                <!-- Appointment Booking Form -->
                                <div class="grid grid-cols-3 gap-4 mb-6">
                                    <div>
                                        <label class="block text-blue-900 text-sm font-medium">Patient's name (Last name, First name)</label>
                                        <input type="text" id="patientName" class="border border-blue-700 p-2 rounded w-full" placeholder="Enter patient name">
                                    </div>
                                    <div>
                                        <label class="block text-blue-900 text-sm font-medium">Choose date</label>
                                        <input type="date" id="appointmentDate" class="border border-blue-700 p-2 rounded w-full">
                                    </div>
                                    <div>
                                        <label class="block text-blue-900 text-sm font-medium">Choose time</label>
                                        <input type="time" id="appointmentTime" class="border border-blue-700 p-2 rounded w-full">
                                    </div>
                                    <div>
                                        <label class="block text-blue-900 text-sm font-medium">Choose type</label>
                                        <select id="appointmentType" class="border border-blue-700 p-2 rounded w-full">
                                            <option value="Follow-up">Follow-up</option>
                                            <option value="Check up">Check up</option>
                                            <option value="No Show">No Show</option>
                                        </select>
                                    </div>
                                </div>
                    
                                <div>
                                    <button id="bookAppointmentBtn" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">
                                        Book Appointment
                                    </button>
                                </div> <br>
                    
                                <!-- All Appointments Table -->
                                <h2 class="text-2xl font-semibold text-blue-900 mb-3">All Appointments</h2>
                                <div class="overflow-x-auto">
                                    <table class="w-full border-collapse">
                                        <thead>
                                            <tr class="bg-gray-100 border-b border-blue-700">
                                                <th class="p-3 text-center border-b border-blue-700">Patient ID</th>
                                                <th class="p-3 text-center border-b border-blue-700">Patient</th>
                                                <th class="p-3 text-center border-b border-blue-700">App. ID</th>
                                                <th class="p-3 text-center border-b border-blue-700">Type</th>
                                                <th class="p-3 text-center border-b border-blue-700">Date</th>
                                                <th class="p-3 text-center border-b border-blue-700">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody id="appointmentsTable">
                                            <!-- Appointments will be loaded here -->
                                        </tbody>
                                    </table>
                                </div>
                                <div class="h-80"></div>
                            </div>
                        `;
                    
                        setActiveButtons(followUpBtn);
                    
                        const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");
                        const appointmentsTable = document.getElementById("appointmentsTable");
                        const bellDropdown = document.getElementById("notificationDropdown");
                    
                        // Load appointments from localStorage
                        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
                        loadAppointments(appointments);
                    
                        bookAppointmentBtn.addEventListener("click", () => {
                            const patientName = document.getElementById("patientName").value.trim();
                            const date = document.getElementById("appointmentDate").value;
                            const time = document.getElementById("appointmentTime").value;
                            const type = document.getElementById("appointmentType").value;
                    
                            if (!patientName) {
                                showErrorPopup("Please enter the patient's name.");
                                return;
                            }
                    
                            // Load patient data from localStorage
                            const patients = JSON.parse(localStorage.getItem("patients")) || [];
                            const patient = patients.find(p => p.name === patientName);
                    
                            if (!patient) {
                                showErrorPopup("Patient not found. Please register the patient first.");
                                return;
                            }
                    
                            const patientID = patient.registrationNumber;
                    
                            // Generate random Appointment ID
                            const appointmentID = `APID${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`;
                    
                            // Create new appointment object
                            const newAppointment = {
                                patientID,
                                patientName,
                                appointmentID,
                                type,
                                date,
                                time
                            };
                    
                            // Add the new appointment to the list
                            appointments.push(newAppointment);
                            localStorage.setItem("appointments", JSON.stringify(appointments));
                    
                            // Add the new appointment to the table
                            const newRow = `
                                <tr class="border-b border-blue-700">
                                    <td class="p-3">${patientID}</td>
                                    <td class="p-3">${patientName}</td>
                                    <td class="p-3">${appointmentID}</td>
                                    <td class="p-3">${type}</td>
                                    <td class="p-3">${date}</td>
                                    <td class="p-3">${time}</td>
                                </tr>
                            `;
                            appointmentsTable.innerHTML += newRow;
                    
                            // Add notification
                            const notificationItem = document.createElement("div");
                            notificationItem.className = "p-2 border-b border-gray-300 text-blue-900 flex justify-between items-center";
                    
                            // Remove "No new notifications" if exists
                            const noNotifications = document.getElementById("noNotifications");
                            if (noNotifications) {
                                noNotifications.remove();
                            }
                    
                            // Notification text
                            const notificationText = document.createElement("span");
                            notificationText.textContent = `New appointment booked by ${patientName}: ${type} on ${date} at ${time}`;
                            notificationItem.appendChild(notificationText);
                    
                            // Close icon
                            const closeIcon = document.createElement("span");
                            closeIcon.className = "cursor-pointer text-red-500 ml-2";
                            closeIcon.innerHTML = "&times;";
                            closeIcon.addEventListener("click", (event) => {
                                event.stopPropagation();
                                notificationItem.remove();
                                updateNotificationCount(-1);
                            });
                            notificationItem.appendChild(closeIcon);
                    
                            bellDropdown.appendChild(notificationItem);
                            updateNotificationCount(1);
                        });
                    
                        // Function to load appointments into the table
                        function loadAppointments(appointments) {
                            appointmentsTable.innerHTML = "";
                            appointments.forEach(appointment => {
                                const row = `
                                    <tr class="border-b border-blue-700">
                                        <td class="p-3">${appointment.patientID}</td>
                                        <td class="p-3">${appointment.patientName}</td>
                                        <td class="p-3">${appointment.appointmentID}</td>
                                        <td class="p-3">${appointment.type}</td>
                                        <td class="p-3">${appointment.date}</td>
                                        <td class="p-3">${appointment.time}</td>
                                    </tr>
                                `;
                                appointmentsTable.innerHTML += row;
                            });
                        }
                    
                        // Function to show error popup
                        function showErrorPopup(message) {
                            const errorPopup = document.createElement("div");
                            errorPopup.className = "fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50";
                            errorPopup.innerText = message;
                    
                            document.body.appendChild(errorPopup);
                    
                            // Automatically remove the popup after 3 seconds
                            setTimeout(() => {
                                errorPopup.remove();
                            }, 3000);
                        }
                    
                        // Function to update notification count
                        function updateNotificationCount(change) {
                            const bellIcon = document.getElementById("notificationBell");
                            let count = parseInt(bellIcon.getAttribute("data-count")) || 0;
                            count += change;
                    
                            if (count > 0) {
                                bellIcon.setAttribute("data-count", count);
                                bellIcon.classList.add("relative");
                                if (!bellIcon.querySelector(".notification-badge")) {
                                    const badge = document.createElement("span");
                                    badge.className = "notification-badge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1";
                                    badge.textContent = count;
                                    bellIcon.appendChild(badge);
                                } else {
                                    bellIcon.querySelector(".notification-badge").textContent = count;
                                }
                            } else {
                                bellIcon.removeAttribute("data-count");
                                const badge = bellIcon.querySelector(".notification-badge");
                                if (badge) badge.remove();
                            }
                        }
                    }
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    async function showConsentForm() {
                        content.innerHTML = `
                            <div class="p-4 bg-gray rounded-lg shadow-md h-[100vh] w-full overflow-y-auto">
                                <div class="flex-grow">
                                    <h2 class="text-3xl font-semibold text-blue-900 mb-6">Medical Consent Form</h2>
                    
                                    <!-- Patient Information Section -->
                                    <div class="mb-6">
                                        <h3 class="text-lg font-semibold text-blue-900 mb-2">Patient Information</h3>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-blue-900 text-sm font-medium">First name:</label>
                                                <input type="text" id="patientFirstName" class="border border-blue-700 p-2 rounded w-full">
                                            </div>
                                            <div>
                                                <label class="block text-blue-900 text-sm font-medium">Last name:</label>
                                                <input type="text" id="patientLastName" class="border border-blue-700 p-2 rounded w-full">
                                            </div>
                                            <div>
                                                <label class="block text-blue-900 text-sm font-medium">Date of birth:</label>
                                                <input type="date" id="patientBirthday" class="border border-blue-700 p-2 rounded w-full">
                                            </div>
                                            <div>
                                                <label class="block text-blue-900 text-sm font-medium">Patient identifier (if known):</label>
                                                <input type="text" id="patientIdentifier" class="border border-blue-700 p-2 rounded w-full">
                                            </div>
                                            <div class="col-span-2">
                                                <label class="block text-blue-900 text-sm font-medium">Gender:</label>
                                                <div class="border border-blue-700 rounded p-2 mt-1">
                                                    <div class="flex items-center space-x-4">
                                                        <label><input type="radio" name="gender" value="male" class="mr-2"> Male</label>
                                                        <label><input type="radio" name="gender" value="female" class="mr-2"> Female</label>
                                                        <label><input type="radio" name="gender" value="non-binary" class="mr-2"> Non-binary</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                                    <!-- Referring Physician Section -->
                                    <div class="mb-6">
                                        <h3 class="text-lg font-semibold text-blue-900 mb-2">Referring Physician</h3>
                                        <div>
                                            <label class="block text-blue-900 text-sm font-medium">Your doctor:</label>
                                            <input type="text" id="referringDoctor" class="border border-blue-700 p-2 rounded w-full" placeholder="Referring doctor's name">
                                        </div>
                                        <div class="mt-2">
                                            <label class="block text-blue-900 text-sm font-medium">Has recommended the following treatment(s)/procedure(s):</label>
                                            <textarea id="treatmentRecommended" class="border border-blue-700 p-2 rounded w-full" rows="2"></textarea>
                                        </div>
                                    </div>
                    
                                    <!-- Condition Description Section -->
                                    <div class="mb-6">
                                        <label class="block text-blue-900 text-sm font-medium">I understand the following condition(s) as indicated in my case:</label>
                                        <textarea id="conditionDescription" class="border border-blue-700 p-2 rounded w-full" rows="4"></textarea>
                                    </div>
                    
                                    <!-- Risks/Complications Section -->
                                    <div class="mb-6">
                                        <label class="block text-blue-900 text-sm font-medium">The following risks/complications have been discussed with me by:</label>
                                        <input type="text" id="risksDiscussedBy" class="border border-blue-700 p-2 rounded w-full" placeholder="Referring doctor's name">
                                    </div>
                    
                                    <!-- Clinician Information Section -->
                                    <div class="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label class="block text-blue-900 text-sm font-medium">Clinician name:</label>
                                            <input type="text" id="clinicianName" class="border border-blue-700 p-2 rounded w-full">
                                        </div>
                                        <div>
                                            <label class="block text-blue-900 text-sm font-medium">Clinician signature:</label>
                                            <input type="text" id="clinicianSignature" class="border border-blue-700 p-2 rounded w-full">
                                        </div>
                                        <div>
                                            <label class="block text-blue-900 text-sm font-medium">Clinical designation:</label>
                                            <input type="text" id="clinicalDesignation" class="border border-blue-700 p-2 rounded w-full">
                                        </div>
                                    </div>
                    
                                    <!-- Buttons -->
                                    <div class="flex justify-center mb-4">
                                        <button id="submitConsentForm" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold">
                                            Submit Consent
                                        </button>
                                    </div>
                                    <div class="flex justify-center mb-8">
                                        <button id="viewPatientHistory" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold">
                                            View Patient History
                                        </button>
                                    </div>
                    
                                    <div class="h-20"></div>
                                </div>
                            </div>
                    
                            <!-- Patient Selection Modal -->
                            <div id="patientModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                                <div class="relative bg-white p-6 rounded-lg w-1/2">
                                    <button id="closeModal" class="absolute top-2 right-2 text-blue-700 hover:text-blue-900 text-3xl font-bold">
                                        &times;
                                    </button>
                                    <h2 id="modalTitle" class="text-2xl font-semibold text-blue-900 mb-4">Select Patient</h2>
                                    <ul id="patientList" class="space-y-2"></ul>
                                </div>
                            </div>
                        `;
                    
                        // JS setup
                        const submitConsentForm = document.getElementById("submitConsentForm");
                        const viewPatientHistory = document.getElementById("viewPatientHistory");
                        const patientModal = document.getElementById("patientModal");
                        const closeModal = document.getElementById("closeModal");
                        const bellDropdown = document.getElementById("notificationDropdown");
                    
                        function submitConsentToPatient(patient) {
                            const genderRadio = document.querySelector('input[name="gender"]:checked');
                            const data = {
                                firstName: document.getElementById("patientFirstName")?.value || "",
                                lastName: document.getElementById("patientLastName")?.value || "",
                                birthday: document.getElementById("patientBirthday")?.value || "",
                                identifier: document.getElementById("patientIdentifier")?.value || "",
                                gender: genderRadio ? genderRadio.value : "",
                                referringDoctor: document.getElementById("referringDoctor")?.value || "",
                                treatmentRecommended: document.getElementById("treatmentRecommended")?.value || "",
                                conditionDescription: document.getElementById("conditionDescription")?.value || "",
                                risksDiscussedBy: document.getElementById("risksDiscussedBy")?.value || "",
                                clinicianName: document.getElementById("clinicianName")?.value || "",
                                clinicianSignature: document.getElementById("clinicianSignature")?.value || "",
                                clinicalDesignation: document.getElementById("clinicalDesignation")?.value || "",
                            };
                            function clearConsentForm() {
                                document.getElementById("patientFirstName").value = "";
                                document.getElementById("patientLastName").value = "";
                                document.getElementById("patientBirthday").value = "";
                                document.getElementById("patientIdentifier").value = "";
                                document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
                                document.getElementById("referringDoctor").value = "";
                                document.getElementById("treatmentRecommended").value = "";
                                document.getElementById("conditionDescription").value = "";
                                document.getElementById("risksDiscussedBy").value = "";
                                document.getElementById("clinicianName").value = "";
                                document.getElementById("clinicianSignature").value = "";
                                document.getElementById("clinicalDesignation").value = "";
                            }
                            
                    
                            const patients = JSON.parse(localStorage.getItem("patients")) || [];
                            const updatedPatients = patients.map(p => {
                                if (p.id === patient.id) {
                                    if (!Array.isArray(p.consents)) p.consents = [];
                                    p.consents.push(data);
                                }
                                return p;
                            });
                    
                            localStorage.setItem("patients", JSON.stringify(updatedPatients));
                    
                            alert(`Consent form submitted to ${patient.name}`);
                            patientModal.classList.add("hidden");
                            clearConsentForm();

                        }
                    
                        async function showPatientModal(submitMode = true) {
                            const patients = JSON.parse(localStorage.getItem("patients")) || [];
                            const patientList = document.getElementById("patientList");
                            patientList.innerHTML = "";
                    
                            if (patients.length > 0) {
                                patients.forEach(patient => {
                                    const listItem = document.createElement("li");
                                    listItem.className = "cursor-pointer p-2 border-b border-gray-300 text-blue-700 hover:bg-blue-100 rounded";
                                    listItem.textContent = patient.name;
                                    listItem.addEventListener("click", () => {
                                        patientModal.classList.add("hidden");
                                        if (submitMode) {
                                            submitConsentToPatient(patient);
                                        } else {
                                            showPatientHistory(patient);
                                        }
                                    });
                                    patientList.appendChild(listItem);
                                });
                            } else {
                                patientList.innerHTML = "<p class='text-center'>No patients found.</p>";
                            }
                    
                            patientModal.classList.remove("hidden");
                        }
                    
                        function showPatientHistory(patient) {
                            const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
                            const foundPatient = storedPatients.find(p => p.id === patient.id);
                        
                            if (!foundPatient || !foundPatient.consents || foundPatient.consents.length === 0) {
                                alert(`No consent history found for ${patient.name}.`);
                                return;
                            }
                        
                            // Let's take the last consent (most recent)
                            const lastConsent = foundPatient.consents[foundPatient.consents.length - 1];
                        
                            // Prefill the form
                            document.getElementById("patientFirstName").value = lastConsent.firstName || "";
                            document.getElementById("patientLastName").value = lastConsent.lastName || "";
                            document.getElementById("patientBirthday").value = lastConsent.birthday || "";
                            document.getElementById("patientIdentifier").value = lastConsent.identifier || "";
                        
                            if (lastConsent.gender) {
                                const genderRadio = document.querySelector(`input[name="gender"][value="${lastConsent.gender}"]`);
                                if (genderRadio) genderRadio.checked = true;
                            }
                        
                            document.getElementById("referringDoctor").value = lastConsent.referringDoctor || "";
                            document.getElementById("treatmentRecommended").value = lastConsent.treatmentRecommended || "";
                            document.getElementById("conditionDescription").value = lastConsent.conditionDescription || "";
                            document.getElementById("risksDiscussedBy").value = lastConsent.risksDiscussedBy || "";
                            document.getElementById("clinicianName").value = lastConsent.clinicianName || "";
                            document.getElementById("clinicianSignature").value = lastConsent.clinicianSignature || "";
                            document.getElementById("clinicalDesignation").value = lastConsent.clinicalDesignation || "";
                        
                            // No alert anymore — just prefill the form.
                        }
                        
                    
                        closeModal.addEventListener("click", () => patientModal.classList.add("hidden"));
                        submitConsentForm.addEventListener("click", () => showPatientModal(true));
                        viewPatientHistory.addEventListener("click", () => showPatientModal(false));
                    
                        setActiveButtons(consentFormBtn);
                    }
                    
                    
                    
                    
                    
                           
                    function showBillings() {
                        content.innerHTML = `
                            <div class="p-4 bg-gray rounded-lg shadow-md h-[100vh] w-full overflow-y-auto">
                                <!-- Insurance Section -->
                                <div class="mb-6">
                                    <div class="flex justify-between items-center mb-4">
                                        <h3 class="text-2xl font-semibold text-blue-900">Insurance</h3>
                                        <div class="relative w-1/2">
                                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
                                            </svg>
                                            <input type="text" id="insuranceSearchInput" placeholder="Search..."
                                                class="p-3 pl-10 border border-blue-900 rounded-full w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        </div>
                                    </div>
                    
                                    <!-- Blue Line -->
                                    <div class="h-1 bg-blue-900 mb-4"></div>
                                    <!-- Insurance Table -->
                                    <div class="w-full p-2 mt-2 relative overflow-x-auto">
                                        <table class="w-full border-collapse">
                                            <thead>
                                                <tr class="bg-gray-100 border-b border-blue-900">
                                                    <th class="p-3 text-center">PRIORITY</th>
                                                    <th class="p-3 text-center">PLAN NAME</th>
                                                    <th class="p-3 text-center">PLAN NO.</th>
                                                    <th class="p-3 text-center">EFFECTIVE DATE</th>
                                                    <th class="p-3 text-center">EXPIRATION DATE</th>
                                                    <th class="p-3 text-center">ACTIVE</th>
                                                </tr>
                                            </thead>
                                            <tbody id="insuranceTable">
                                                <!-- Insurance data will be dynamically added here -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                    
                                <div class="h-80"></div> <!-- Added space at the bottom -->
                    
                                <!-- Insurance Details Form -->
                                <div class="grid grid-cols-2 gap-4 mb-6">
                                    <div class="flex flex-col">
                                        <label>INSURANCE PRIORITY</label>
                                        <select id="insurancePriority" class="border p-2 rounded">
                                            <option value="Primary">Primary</option>
                                            <option value="Secondary">Secondary</option>
                                            <option value="Tertiary">Tertiary</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col">
                                        <label>POLICY HOLDER</label>
                                        <select id="policyHolder" class="border p-2 rounded">
                                            <option value="Self">Self</option>
                                            <option value="Spouse">Spouse</option>
                                            <option value="Parent">Parent</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col">
                                        <label>PLAN TYPE</label>
                                        <select id="planType" class="border p-2 rounded">
                                            <option value="hmo">HMO</option>
                                            <option value="ppo">PPO</option>
                                            <option value="pos">POS</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col">
                                        <label>PLAN NAME</label>
                                        <select id="planName" class="border p-2 rounded">
                                            <option value="Basic">Basic</option>
                                            <option value="Standard">Standard</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col">
                                        <label>TYPE OF COVERAGE</label>
                                        <select id="coverageType" class="border p-2 rounded">
                                            <option value="Medical">Medical</option>
                                            <option value="Dental">Dental</option>
                                            <option value="Vision">Vision</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col">
                                        <label>GROUP NAME</label>
                                        <select id="groupName" class="border p-2 rounded">
                                            <option value="group_a">Group A</option>
                                            <option value="group_b">Group B</option>
                                            <option value="group_c">Group C</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col">
                                        <label>EFFECTIVE DATE</label>
                                        <input type="date" id="effectiveDate" class="border p-2 rounded">
                                    </div>
                                    <div class="flex flex-col">
                                        <label>EXPIRATION DATE</label>
                                        <input type="date" id="expirationDate" class="border p-2 rounded">
                                    </div>
                                    <div class="flex flex-col">
                                        <label>INSURANCE COMPANY</label>
                                        <select id="insuranceCompany" class="border p-2 rounded">
                                            <option value="company_a">Company A</option>
                                            <option value="company_b">Company B</option>
                                            <option value="company_c">Company C</option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col">
                                        <label>GROUP NUMBER</label>
                                        <input type="text" id="groupNumber" class="border p-2 rounded" readonly>
                                    </div>
                                </div>
                    
                                <!-- Confirm Button -->
                                <div class="flex justify-center gap-5 mt-4">
                                    <button id="confirmInsuranceBtn" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">
                                        Confirm Insurance
                                    </button>
                                </div>
                                <div class="h-10"></div>
                    
                                <!-- Insurance Card Section -->
                                <div class="bg-blue-900 text-white p-4 rounded-lg flex items-center justify-between mb-6">
                                    <div>
                                        <h3 class="text-lg font-semibold">INSURANCE CARDS</h3>
                                        <p>SCAN THE FOLLOWING QR CODE TO ACCESS DATA:</p>
                                    </div>
                                    <img src="qr.png" alt="QR Code" class="w-16 h-16">
                                </div>
                                <div class="h-20"></div> <!-- Added space at the bottom -->
                    
                                <!-- Payment History Section -->
                                <div class="mb-6">
                                    <!-- Grid Layout for Inputs -->
                                    <div class="grid grid-cols-3 gap-4 mt-4">
                                        <div class="flex flex-col">
                                            <label class="block text-blue-900 text-sm font-medium">Date of Payment</label>
                                            <input type="date" id="paymentDate" class="border p-2 rounded">
                                        </div>
                                        <div class="flex flex-col">
                                            <label class="block text-blue-900 text-sm font-medium">Time of Payment</label>
                                            <input type="time" id="paymentTime" class="border p-2 rounded">
                                        </div>
                                        <div class="flex flex-col relative">
                                            <label class="block text-gray-100 text-sm font-medium">System Created by: Adrian Aquino</label>
                                            <div class="relative w-full">
                                                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-900"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                          d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
                                                </svg>
                                                <input type="text" id="paymentSearchInput" placeholder="Search payments..."
                                                       class="p-3 pl-12 border border-blue-900 rounded-full w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            </div>
                                        </div>
                                        <div class="flex flex-col">
                                            <label class="block text-blue-900 text-sm font-medium">Bank</label>
                                            <input type="text" id="paymentBank" class="border p-2 rounded">
                                        </div>
                                        <div class="flex flex-col">
                                            <label class="block text-blue-900 text-sm font-medium">Proof of Payment</label>
                                            <input type="file" accept="image/*" id="proofOfPaymentInput" class="border p-2 rounded">
                                        </div>
                                    </div>
                    
                                    <!-- Buttons Below Inputs -->
                                    <div class="flex justify-center gap-4 mt-4">
                                        <button id="confirmPaymentBtn" class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 hover:text-white font-bold">Confirm Payment</button>
                                    </div>
                    
                                    <!-- Blue Line -->
                                    <div class="h-1 bg-blue-900 my-4"></div>
                    
                                    <!-- Payments Table -->
                                    <div class="w-full p-2 mt-2 relative overflow-x-auto">
                                        <table class="w-full border-collapse">
                                            <thead>
                                                <tr class="bg-gray-100 border-b border-blue-900">
                                                    <th class="p-3 text-center">DATE/TIME</th>
                                                    <th class="p-3 text-center">BANK</th>
                                                    <th class="p-3 text-center">STATUS</th>
                                                    <th class="p-3 text-center">OR NO.</th>
                                                </tr>
                                            </thead>
                                            <tbody id="paymentTable">
                                                <!-- Payment history will be dynamically added here -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="h-20"></div> <!-- Added space at the bottom -->
                            </div>
                        `;
                    
                        const confirmInsuranceBtn = document.getElementById("confirmInsuranceBtn");
                        const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
                        const insuranceTable = document.getElementById("insuranceTable");
                        const paymentTable = document.getElementById("paymentTable");
                        const insuranceSearchInput = document.getElementById("insuranceSearchInput");
                        const paymentSearchInput = document.getElementById("paymentSearchInput");
                        const groupNumberInput = document.getElementById("groupNumber");
                    
                        // Generate a random group number and display it
                        const randomGroupNumber = Math.floor(100000 + Math.random() * 900000);
                        groupNumberInput.value = randomGroupNumber;
                    
                        // Load insurance data from local storage
                        let insuranceData = JSON.parse(localStorage.getItem("insuranceData")) || [];
                        insuranceData.forEach(insurance => {
                            const row = document.createElement("tr");
                            row.classList.add("border-b", "border-blue-900");
                            row.innerHTML = `
                                <td class="p-3 text-center">${insurance.priority}</td>
                                <td class="p-3 text-center">${insurance.planName}</td>
                                <td class="p-3 text-center">${insurance.groupNumber}</td>
                                <td class="p-3 text-center">${insurance.effectiveDate}</td>
                                <td class="p-3 text-center">${insurance.expirationDate}</td>
                                <td class="p-3 text-center">${insurance.active}</td>
                            `;
                            insuranceTable.appendChild(row);
                        });
                    
                        // Add event listener to confirm insurance button
                        confirmInsuranceBtn.addEventListener("click", () => {
                            const insurance = {
                                priority: document.getElementById("insurancePriority").value,
                                policyHolder: document.getElementById("policyHolder").value,
                                planType: document.getElementById("planType").value,
                                planName: document.getElementById("planName").value,
                                coverageType: document.getElementById("coverageType").value,
                                groupName: document.getElementById("groupName").value,
                                effectiveDate: document.getElementById("effectiveDate").value,
                                expirationDate: document.getElementById("expirationDate").value,
                                insuranceCompany: document.getElementById("insuranceCompany").value,
                                groupNumber: groupNumberInput.value,
                                active: "NO"
                            };
                    
                            const row = document.createElement("tr");
                            row.classList.add("border-b", "border-blue-900");
                            row.innerHTML = `
                                <td class="p-3 text-center">${insurance.priority}</td>
                                <td class="p-3 text-center">${insurance.planName}</td>
                                <td class="p-3 text-center">${insurance.groupNumber}</td>
                                <td class="p-3 text-center">${insurance.effectiveDate}</td>
                                <td class="p-3 text-center">${insurance.expirationDate}</td>
                                <td class="p-3 text-center">${insurance.active}</td>
                            `;
                            insuranceTable.appendChild(row);
                    
                            // Store insurance data in local storage
                            insuranceData.push(insurance);
                            localStorage.setItem("insuranceData", JSON.stringify(insuranceData));
                    
                            // Clear the form inputs
                            document.getElementById("insurancePriority").value = "Primary";
                            document.getElementById("policyHolder").value = "Self";
                            document.getElementById("planType").value = "hmo";
                            document.getElementById("planName").value = "Basic";
                            document.getElementById("coverageType").value = "Medical";
                            document.getElementById("groupName").value = "group_a";
                            document.getElementById("effectiveDate").value = "";
                            document.getElementById("expirationDate").value = "";
                            document.getElementById("insuranceCompany").value = "company_a";
                            groupNumberInput.value = Math.floor(100000 + Math.random() * 900000);
                        });
                    
                        // Add event listener to confirm payment button
                        confirmPaymentBtn.addEventListener("click", () => {
                            const paymentDate = document.getElementById("paymentDate").value;
                            const paymentTime = document.getElementById("paymentTime").value;
                            const paymentBank = document.getElementById("paymentBank").value;
                    
                            // Generate a random OR No.
                            const paymentOR = `OR-${Math.floor(100000 + Math.random() * 900000)}`;
                    
                            if (paymentDate && paymentTime && paymentBank) {
                                const newRow = document.createElement("tr");
                                newRow.classList.add("text-center", "border-b-2", "border-blue-900");
                    
                                newRow.innerHTML = `
                                    <td class="p-2">${paymentDate} ${paymentTime}</td>
                                    <td class="p-2">${paymentBank}</td>
                                    <td class="p-2">POSTED</td>
                                    <td class="p-2 text-blue-900 font-semibold">${paymentOR}</td>
                                `;
                    
                                paymentTable.appendChild(newRow);
                    
                                // Clear the form inputs
                                document.getElementById("paymentDate").value = "";
                                document.getElementById("paymentTime").value = "";
                                document.getElementById("paymentBank").value = "";
                                document.getElementById("proofOfPaymentInput").value = "";
                    
                                // Update insurance data in local storage
                                insuranceData.forEach(insurance => {
                                    insurance.active = "YES";
                                });
                                localStorage.setItem("insuranceData", JSON.stringify(insuranceData));
                    
                                // Update the insurance table
                                const rows = insuranceTable.querySelectorAll("tr");
                                rows.forEach(row => {
                                    const activeCell = row.querySelectorAll("td")[5]; // Active status is in the 6th column
                                    if (activeCell) {
                                        activeCell.textContent = "YES";
                                    }
                                });
                            } else {
                                alert("Please fill in all fields before confirming payment.");
                            }
                        });
                    
                        // Search functionality for insurance table
                        insuranceSearchInput.addEventListener("input", function () {
                            const searchValue = insuranceSearchInput.value.toLowerCase();
                            const rows = insuranceTable.querySelectorAll("tr");
                            rows.forEach(row => {
                                const cells = row.querySelectorAll("td");
                                const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchValue));
                                row.style.display = match ? "" : "none";
                            });
                        });
                    
                        // Search functionality for payment table
                        paymentSearchInput.addEventListener("input", function () {
                            const searchValue = paymentSearchInput.value.toLowerCase();
                            const rows = paymentTable.querySelectorAll("tr");
                    
                            rows.forEach(row => {
                                const orCell = row.querySelectorAll("td")[3]; // OR number is in the 4th column
                                if (orCell) {
                                    const orText = orCell.textContent.toLowerCase();
                                    row.style.display = orText.includes(searchValue) ? "" : "none";
                                }
                            });
                        });
                        setActiveButtons(billingsBtn);
                    }
                    
                    
                    
                    
                    
                    
        
        

        // ur my home
        setActiveButtons(dashboardBtn, homeBtn);
        

        // listeners 
        dashboardBtn.addEventListener("click", showHome);
        homeBtn.addEventListener("click", showHome);
        patientIndexBtn.addEventListener("click", showPatientIndex);
        registrationBtn.addEventListener("click", showRegistration);
        medicalBtn.addEventListener("click", showMedicalHistory);
        healthBtn.addEventListener("click", showHealthAssessment);
        vitalBtn.addEventListener("click", showVitalSigns);
        labBtn.addEventListener("click", showLabResults);
        marBtn.addEventListener("click", showMAR);
        cdssBtn.addEventListener("click", showCDSS);
        followUpBtn.addEventListener("click", showFollowUp);
        consentFormBtn.addEventListener("click", showConsentForm);
        billingsBtn.addEventListener("click", showBillings);

        //icons 
        document.addEventListener("DOMContentLoaded", function () {
            const bell = document.getElementById("notificationBell");
            const bellDropdown = document.getElementById("notificationDropdown");
            const profile = document.getElementById("profileIcon");
            const profileDropdown = document.getElementById("profileDropdown");
            const logoutBtn = document.getElementById("logoutBtn");

            // Toggle Profile Dropdown
            profile.addEventListener("click", function (event) {
                event.stopPropagation();
                profileDropdown.classList.toggle("hidden");
                bellDropdown.classList.add("hidden"); // Close bell dropdown
            });

            // Toggle Bell Dropdown
            bell.addEventListener("click", function (event) {
                event.stopPropagation();
                bellDropdown.classList.toggle("hidden");
                profileDropdown.classList.add("hidden"); // Close profile dropdown
            });

            // Hide dropdowns when clicking outside
            document.addEventListener("click", function (event) {
                if (!profile.contains(event.target) && !profileDropdown.contains(event.target)) {
                    profileDropdown.classList.add("hidden");
                }
                if (!bell.contains(event.target) && !bellDropdown.contains(event.target)) {
                    bellDropdown.classList.add("hidden");
                }
            });

            // Logout Button Click Event
            if (logoutBtn) {
                logoutBtn.addEventListener("click", function () {
                    window.location.href = "login.html"; // Redirect to login page
                });
            }
        });







      bellDropdown.classList.add("hidden");
                }
            });

            // Logout Button Click Event
            if (logoutBtn) {
                logoutBtn.addEventListener("click", function () {
                    window.location.href = "login.html"; // Redirect to login page
                });
            }
        });







