// Animation d'entrée du site B
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 1000);
});

const mindmap = document.getElementById('mindmap');
const mindmapContainer = document.getElementById('mindmapContainer');
const card = document.getElementById('card');
const overlay = document.getElementById('overlay');
const cardClose = document.getElementById('cardClose');

let scale = 1;
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;

// Data structure for nodes (inchangée du site A)
const nodeData = {
    central: {
        title: "Edgar BRUNIAU",
        description: "Développeur Full-Stack passionné par les technologies web modernes et l'innovation numérique. Spécialisé en React, Node.js et architecture cloud.",
        tags: ["Développeur", "Designer", "Entrepreneur"],
        links: [
            { text: "Portfolio", url: "#portfolio" },
            { text: "LinkedIn", url: "#linkedin" },
            { text: "GitHub", url: "#github" },
            { text: "Contact", url: "#contact" }
        ]
    },
    theme1: {
        title: "Développement",
        description: "Ressources et documentations sur le développement web, les frameworks modernes et les bonnes pratiques.",
        tags: ["React", "Node.js", "JavaScript", "TypeScript"],
        docs: ["React Guide", "Node.js API", "TypeScript Best Practices", "GraphQL Documentation"]
    },
    theme2: {
        title: "Design",
        description: "Principes de design, guidelines UI/UX et ressources créatives pour des interfaces utilisateur exceptionnelles.",
        tags: ["UI/UX", "Design System", "Figma", "Adobe"],
        docs: ["UI/UX Principles", "Brand Identity", "Design System Guide", "Figma Workflows"]
    },
    theme3: {
        title: "Certifications",
        description: "Certifications professionnelles et formations continues dans le domaine du développement et du cloud.",
        tags: ["AWS", "Google Cloud", "Microsoft", "Certifications"],
        docs: ["AWS Certification", "Google Cloud Professional", "React Developer Cert", "Node.js Certification"]
    },
    theme4: {
        title: "Projets",
        description: "Portfolio de projets réalisés, études de cas et retours d'expérience sur les développements récents.",
        tags: ["Portfolio", "Case Studies", "Open Source", "Projets"],
        docs: ["Portfolio 2024", "E-commerce Platform", "SaaS Dashboard", "Mobile App React Native"]
    },
    doc1: {
        title: "React Guide",
        description: "Guide complet pour maîtriser React : hooks, patterns, performance et écosystème.",
        tags: ["React", "JavaScript", "Frontend"],
        links: [
            { text: "Ouvrir le document", url: "#doc1" }
        ]
    },
    doc2: {
        title: "Node.js API",
        description: "Documentation pour créer des APIs robustes avec Node.js, Express et bases de données.",
        tags: ["Node.js", "API", "Backend"],
        links: [
            { text: "Ouvrir le document", url: "#doc2" }
        ]
    },
    doc3: {
        title: "UI/UX Principles",
        description: "Principes fondamentaux du design d'interface et d'expérience utilisateur moderne.",
        tags: ["Design", "UI/UX", "Figma"],
        links: [
            { text: "Ouvrir le document", url: "#doc3" }
        ]
    },
    doc4: {
        title: "Brand Identity",
        description: "Guide de création et gestion d'identité de marque pour les entreprises tech.",
        tags: ["Branding", "Design", "Marketing"],
        links: [
            { text: "Ouvrir le document", url: "#doc4" }
        ]
    },
    doc5: {
        title: "AWS Certification",
        description: "Préparation et ressources pour les certifications AWS Solutions Architect.",
        tags: ["AWS", "Cloud", "Certification"],
        links: [
            { text: "Ouvrir le document", url: "#doc5" }
        ]
    },
    doc6: {
        title: "Portfolio 2024",
        description: "Présentation des projets réalisés en 2024, technologies utilisées et résultats obtenus.",
        tags: ["Portfolio", "Projets", "2024"],
        links: [
            { text: "Voir le portfolio", url: "#portfolio2024" }
        ]
    }
};

// Create connections avec masquage des extrémités sous les bulles
function createConnections() {
    // Clear existing connections
    document.querySelectorAll('.connection').forEach(conn => conn.remove());
    
    const connections = [
        { from: 'central', to: 'theme1' },
        { from: 'central', to: 'theme2' },
        { from: 'central', to: 'theme3' },
        { from: 'central', to: 'theme4' },
        { from: 'theme1', to: 'doc1' },
        { from: 'theme1', to: 'doc2' },
        { from: 'theme2', to: 'doc3' },
        { from: 'theme2', to: 'doc4' },
        { from: 'theme3', to: 'doc5' },
        { from: 'theme4', to: 'doc6' }
    ];

    connections.forEach(conn => {
        const fromNode = document.querySelector(`[data-id="${conn.from}"]`);
        const toNode = document.querySelector(`[data-id="${conn.to}"]`);
        
        if (fromNode && toNode) {
            const connection = document.createElement('div');
            connection.className = 'connection';
            
            const fromRect = fromNode.getBoundingClientRect();
            const toRect = toNode.getBoundingClientRect();
            const containerRect = mindmapContainer.getBoundingClientRect();
            
            const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
            const fromY = fromRect.top + fromRect.height / 2 - containerRect.top - 20;
            const toX = toRect.left + toRect.width / 2 - containerRect.left;
            const toY = toRect.top + toRect.height / 2 - containerRect.top - 20;
            
            const deltaX = toX - fromX;
            const deltaY = toY - fromY;
            const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            
            // Rayons augmentés pour bien masquer les extrémités sous les bulles
            const fromRadius = fromNode.classList.contains('central-node') ? 32 : 
                              fromNode.classList.contains('theme-node') ? 25 : 18;
            const toRadius = toNode.classList.contains('central-node') ? 32 : 
                            toNode.classList.contains('theme-node') ? 25 : 18;
            
            const unitX = deltaX / length;
            const unitY = deltaY / length;
            
            const startX = fromX + fromRadius * unitX;
            const startY = fromY + fromRadius * unitY;
            const endX = toX - toRadius * unitX;
            const endY = toY - toRadius * unitY;
            
            const adjustedLength = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            
            connection.style.left = startX + 'px';
            connection.style.top = startY + 'px';
            connection.style.width = adjustedLength + 'px';
            connection.style.transform = `rotate(${angle}deg)`;
            
            mindmap.appendChild(connection);
        }
    });
}

// Show card (fonction identique du site A)
function showCard(nodeId) {
    const data = nodeData[nodeId];
    if (!data) return;

    document.getElementById('cardTitle').textContent = data.title;
    document.getElementById('cardDescription').textContent = data.description;

    // Tags
    const metaContainer = document.getElementById('cardMeta');
    metaContainer.innerHTML = '';
    data.tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'card-tag';
        tagElement.textContent = tag;
        metaContainer.appendChild(tagElement);
    });

    // Actions/Links
    const actionsContainer = document.getElementById('cardActions');
    actionsContainer.innerHTML = '';
    
    if (data.links) {
        if (nodeId.startsWith('doc')) {
            const mainLink = data.links[0];
            const linkElement = document.createElement('a');
            linkElement.className = 'card-link';
            linkElement.href = mainLink.url;
            linkElement.textContent = mainLink.text;
            actionsContainer.appendChild(linkElement);
        } else {
            data.links.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.className = 'card-link';
                linkElement.href = link.url;
                linkElement.textContent = link.text;
                actionsContainer.appendChild(linkElement);
            });
        }
    }

    // Documents list for theme nodes
    const docsList = document.getElementById('docsList');
    if (data.docs) {
        docsList.style.display = 'block';
        docsList.innerHTML = '';
        data.docs.forEach(doc => {
            const docElement = document.createElement('div');
            docElement.className = 'doc-item';
            docElement.textContent = doc;
            docElement.addEventListener('click', () => {
                hideCard();
                const docId = Object.keys(nodeData).find(key => 
                    nodeData[key].title === doc
                );
                if (docId) {
                    setTimeout(() => showCard(docId), 300);
                }
            });
            docsList.appendChild(docElement);
        });
    } else {
        docsList.style.display = 'none';
    }

    overlay.classList.add('active');
    card.classList.add('active');
}

// Hide card
function hideCard() {
    overlay.classList.remove('active');
    card.classList.remove('active');
}

// Event listeners (identiques du site A)
document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('click', (e) => {
        e.stopPropagation();
        showCard(node.dataset.id);
    });
});

cardClose.addEventListener('click', hideCard);
overlay.addEventListener('click', hideCard);

// Zoom controls
document.getElementById('zoomIn').addEventListener('click', () => {
    scale = Math.min(scale * 1.2, 3);
    mindmap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

document.getElementById('zoomOut').addEventListener('click', () => {
    scale = Math.max(scale / 1.2, 0.3);
    mindmap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

document.getElementById('resetView').addEventListener('click', () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    mindmap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

// Pan functionality
mindmapContainer.addEventListener('mousedown', (e) => {
    if (e.target === mindmapContainer || e.target === mindmap) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        mindmapContainer.style.cursor = 'grabbing';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        mindmap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    mindmapContainer.style.cursor = 'grab';
});

// Wheel zoom
mindmapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.3, Math.min(3, scale * zoomFactor));
    mindmap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

// Initialize
setTimeout(() => {
    createConnections();
}, 600);

// Recreate connections on window resize
window.addEventListener('resize', () => {
    setTimeout(() => {
        createConnections();
    }, 100);
});

// Intersection Observer pour les animations d'entrée (inspiré du site B)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
}, observerOptions);

// Observer tous les nœuds pour l'animation d'entrée
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.node').forEach(node => {
        node.style.opacity = '0.3';
        node.style.transform = 'translate(-50%, -50%) scale(0.8)';
        node.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(node);
    });
    
    // Animation décalée pour les nœuds
    setTimeout(() => {
        document.querySelectorAll('.node').forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '1';
                node.style.transform = 'translate(-50%, -50%) scale(1)';
            }, index * 150);
        });
    }, 800);
});