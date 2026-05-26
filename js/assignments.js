const AssignmentManager = {
  initListPage() {
    const container = document.getElementById('assignments-list');
    if (!container) return;
    container.innerHTML = EduData.assignments.map(a => `
      <div class="card assignment-card ${a.status} fade-in">
        <div class="flex-between flex-wrap gap-1">
          <div>
            <h3>${a.title}</h3>
            <p class="text-muted">${a.courseName}</p>
          </div>
          <span class="tag ${a.status === 'overdue' ? 'tag-warning' : a.status === 'graded' ? 'tag-success' : ''}">${a.status}</span>
        </div>
        <p class="mt-1">${a.description}</p>
        <div class="flex-between mt-2">
          <span class="text-muted">Due: ${a.dueDate}</span>
          ${a.grade !== null ? `<strong class="text-success">Grade: ${a.grade}/${a.maxPoints}</strong>` : ''}
        </div>
        ${a.status === 'pending' || a.status === 'overdue' ? `
          <div class="upload-zone mt-2" data-id="${a.id}">
            <p>📁 Drop files here or click to upload</p>
            <small class="text-muted">PDF, ZIP, or source code</small>
          </div>
        ` : ''}
      </div>
    `).join('');

    container.querySelectorAll('.upload-zone').forEach(zone => {
      zone.addEventListener('click', () => {
        NotificationSystem.toast('Assignment submitted successfully!', 'success');
        zone.innerHTML = '<p class="text-success">✓ Submitted</p>';
      });
    });
  },

  initCertificatesPage() {
    const grid = document.getElementById('certificates-grid');
    if (!grid) return;
    grid.innerHTML = EduData.certificates.map((c, i) => `
      <div class="certificate-card card ${i < 5 ? 'unlocked' : ''}">
        <h3>🏆 Certificate of Completion</h3>
        <p class="mt-2" style="font-size:1.1rem;font-weight:600">${c.courseName}</p>
        <p class="text-muted mt-1">${c.category}</p>
        <p class="mt-2"><small>Issued: ${c.issuedDate}</small></p>
        <p class="text-muted"><small>ID: ${c.credentialId}</small></p>
        <button class="btn btn-outline btn-sm mt-2" onclick="NotificationSystem.toast('Certificate download started','success')">Download PDF</button>
      </div>
    `).join('');
  }
};
