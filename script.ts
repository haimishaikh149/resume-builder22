



// Form submit event ko handle karte hain
document.getElementById("resumeForm")?.addEventListener
("submit", function(event) {
    event.preventDefault();

    // Form ke elements ko access kar rahe hain
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLInputElement;
    const experienceElement = document.getElementById("experience") as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;
    const usernameElement = document.getElementById("username") as HTMLInputElement;
    const resumeOutputElement = document.getElementById("resumeOutput")  // HTMLElement ka cast yahan

    // Check kar rahe hain ke tamam elements available hain
    if (profilePictureInput && nameElement && emailElement &&
         phoneElement && educationElement && experienceElement
          && skillsElement && usernameElement && resumeOutputElement) {
        // Saari values ko access kar rahe hain
        const name = nameElement.value;        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        // Resume HTML ka content bana rahe hain


        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
            <p><strong>Name:</strong> <span class="editable">${name}</span></p>
            <p><strong>Email:</strong> <span class="editable">${email}</span></p>
            <p><strong>Phone Number:</strong> <span class="editable">${phone}</span></p>
            <h3>Education</h3>
            <p class="editable">${education}</p>
            <h3>Experience</h3>
            <p class="editable">${experience}</p>
            <h3>Skills</h3>
            <p class="editable">${skills}</p>
        `;

        // Resume ko output element mein display kar rahe hain
        resumeOutputElement.innerHTML = resumeOutput;

        // Buttons add karte hain
        addButtons(usernameElement.value, resumeOutputElement);

        // Output container ko visible karte hain
        
        resumeOutputElement.style.display = "block";

        // Editable content ko enable karte hain

        makeEditable();
    } else {
        console.error("One or more form elements are missing");
    }


// Editable function jo content ko edit karne ka feature dega
function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // Input element create kar rahe hain aur us mein current value rakh rahe hain
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.classList.add('editing-input');

            // Blur event pe input ki value ko wapas element mein daal dete hain
            input.addEventListener('blur', function() {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline'; // display style ko inline set kar rahe hain
                input.remove();
            });

            currentElement.style.display = 'none'; // display ko none set karte hain taake input show ho
            currentElement.parentNode?.insertBefore(input, currentElement);
            input.focus();
        });
    });
}
          
// PDF, Share Link aur HTML download ke buttons ke liye function
function addButtons(username: string, resumeOutputElement: HTMLElement) {
    let buttonsContainer = document.getElementById("buttonsContainer");
    if (buttonsContainer) {
        buttonsContainer.remove();
    }

    buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttonsContainer";
    resumeOutputElement.appendChild(buttonsContainer);

    // PDF download button
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download as PDF";
    downloadButton.addEventListener("click", () => window.print());
    buttonsContainer.appendChild(downloadButton);

    // Copy Shareable Link button
    const shareLinkButton = document.createElement("button");
    shareLinkButton.textContent = "Copy Shareable Link";
    shareLinkButton.addEventListener("click", async () => {
        const shareableLink = `https://yourdomain.com/resume/${username.replace(/\s+/g, "__")}_cv.html`;
        try {
            await navigator.clipboard.writeText(shareableLink);
            alert("Shareable link copied to clipboard");
        } catch (err) {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link. Please try again.");
        }
    });
    buttonsContainer.appendChild(shareLinkButton);

    // HTML resume download link
    const downloadLink = document.createElement("a");
    downloadLink.href = 'data:text/html;charset=UTF-8,' + encodeURIComponent(resumeOutputElement.innerHTML);
    downloadLink.download = `${username.replace(/\s+/g, "_")}_resume_2024.html`;
    downloadLink.textContent = 'Download your 2024 Resume as HTML';
    buttonsContainer.appendChild(downloadLink);
}
})