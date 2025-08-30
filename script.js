// Variables globales pour l'organicité
let organicTime = 0;
let mouseX = 0;
let mouseY = 0;
let isInteracting = false;

// Animation d'entrée simplifiée
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        document.body.classList.add('loaded');
        startOrganicAnimations();
        initMousePixelEffect();
    }, 1500);
});

// Effet de pixelisation de la souris amélioré - plus compact
function initMousePixelEffect() {
    const mouseEffect = document.getElementById('mousePixelEffect');
    
    // Créer moins de pixels, plus compacts
    for (let i = 0; i < 4; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'mouse-pixel';
        pixel.style.animationDelay = `${i * 0.2}s`;
        mouseEffect.appendChild(pixel);
    }

    let mouseTimeout;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        mouseEffect.style.left = e.clientX + 'px';
        mouseEffect.style.top = e.clientY + 'px';
        mouseEffect.classList.add('active');
        
        // Positionner les pixels plus près de la souris
        const pixels = mouseEffect.querySelectorAll('.mouse-pixel');
        pixels.forEach((pixel, index) => {
            const angle = (index / pixels.length) * Math.PI * 2 + organicTime * 0.5;
            const distance = 6 + Math.sin(organicTime * 3 + index) * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            pixel.style.left = x + 'px';
            pixel.style.top = y + 'px';
        });
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            mouseEffect.classList.remove('active');
        }, 200);
        
        // Effet de parallaxe très subtil
        document.querySelectorAll('.node').forEach((node, index) => {
            const offsetX = (mouseX - 0.5) * (1 + index % 2);
            const offsetY = (mouseY - 0.5) * (1 + index % 2);
            node.style.setProperty('--mouse-x', `${offsetX}px`);
            node.style.setProperty('--mouse-y', `${offsetY}px`);
        });
    });
}

// Animations organiques continues
function startOrganicAnimations() {
    function animate() {
        organicTime += 0.008;
        
        // Mise à jour des variables CSS pour l'organicité
        document.documentElement.style.setProperty('--organic-flow', Math.sin(organicTime) * 0.1);
        document.documentElement.style.setProperty('--pulse-intensity', 1 + Math.sin(organicTime * 1.5) * 0.05);

        requestAnimationFrame(animate);
    }
    animate();
}

const mindmap = document.getElementById('mindmap');
const mindmapContainer = document.getElementById('mindmapContainer');
const card = document.getElementById('card');
const overlay = document.getElementById('overlay');
const cardClose = document.getElementById('cardClose');

// Data structure avec thématique cosmique
const nodeData = {
    central: {
        title: "Edgar BRUNIAU",
        description: "Développeur Full-Stack passionné par l'innovation et l'art du code. Architecture moderne, UX intuitive et technologies de pointe dans l'immensité cosmique du développement.",
        tags: ["Full-Stack Dev", "Code Artist", "Tech Innovator", "Cosmic Coder"],
        links: [
            { text: "Portfolio Stellaire", url: "#portfolio" },
            { text: "LinkedIn Galaxy", url: "#linkedin" },
            { text: "GitHub Universe", url: "#github" },
            { text: "Contact Spatial", url: "#contact" }
        ]
    },
    theme1: {
        title: "Développement",
        description: "L'art du code moderne dans les profondeurs cosmiques : frameworks avant-gardistes, architectures scalables et patterns innovants pour des applications qui transcendent l'ordinaire.",
        tags: ["React", "Node.js", "JavaScript", "TypeScript", "Cosmic Code"],
        docs: ["React Guide", "Node.js API", "TypeScript Best Practices", "GraphQL Documentation"]
    },
    theme2: {
        title: "Design",
        description: "Fusion créative entre design et technologie dans l'espace infini : interfaces immersives, expériences utilisateur fluides et identités visuelles qui brillent comme des étoiles.",
        tags: ["UI/UX", "Design System", "Figma", "Motion Design", "Stellar Design"],
        docs: ["UI/UX Principles", "Brand Identity", "Design System Guide", "Figma Workflows"]
    },
    theme3: {
        title: "Certifications",
        description: "Excellence technique certifiée à travers les galaxies : maîtrise cloud, développement avancé et veille technologique continue pour naviguer dans l'univers tech.",
        tags: ["AWS", "Google Cloud", "Microsoft", "Tech Mastery", "Cosmic Skills"],
        docs: ["AWS Certification", "Google Cloud Professional", "React Developer Cert", "Node.js Certification"]
    },
    theme4: {
        title: "Projets",
        description: "Portfolio d'innovations cosmiques : projets disruptifs, expérimentations créatives et réalisations techniques qui repoussent les limites de l'univers digital.",
        tags: ["Innovation", "Case Studies", "Open Source", "R&D", "Stellar Projects"],
        docs: ["Portfolio 2024", "E-commerce Platform", "SaaS Dashboard", "Mobile App React Native"]
    },
    doc1: {
        title: "React Guide",
        description: "Maîtrise complète de React dans l'espace cosmique : hooks avancés, patterns architecturaux, optimisations performance et écosystème moderne pour des interfaces stellaires.",
        tags: ["React", "JavaScript", "Frontend", "Performance", "Cosmic UI"],
        links: [
            { text: "Explorer le Guide Cosmique", url: "#doc1" }
        ]
    },
    doc2: {
        title: "Node.js API",
        description: "Architecture backend robuste comme les structures galactiques : APIs scalables, microservices, sécurité avancée et intégrations cloud natives dans l'univers serveur.",
        tags: ["Node.js", "API", "Backend", "Microservices", "Cosmic Server"],
        links: [
            { text: "Naviguer dans l'API", url: "#doc2" }
        ]
    },
    doc3: {
        title: "UI/UX Principles",
        description: "Design centré utilisateur inspiré des constellations : psychologie cognitive, patterns d'interaction et interfaces immersives pour l'ère cosmique moderne.",
        tags: ["Design", "UI/UX", "Psychology", "Innovation", "Stellar UX"],
        links: [
            { text: "Découvrir les Principes Stellaires", url: "#doc3" }
        ]
    },
    doc4: {
        title: "Brand Identity",
        description: "Création d'identités visuelles fortes comme des supernovas : storytelling visuel, systèmes graphiques cohérents et impact émotionnel à travers l'espace.",
        tags: ["Branding", "Visual Identity", "Strategy", "Impact", "Cosmic Branding"],
        links: [
            { text: "Voir les Créations Cosmiques", url: "#doc4" }
        ]
    },
    doc5: {
        title: "AWS Certification",
        description: "Expertise cloud architecture dans les nuages galactiques : solutions scalables, sécurité enterprise et optimisation des coûts sur AWS dans l'univers cloud.",
        tags: ["AWS", "Cloud Architecture", "DevOps", "Scale", "Cosmic Cloud"],
        links: [
            { text: "Valider les Compétences Stellaires", url: "#doc5" }
        ]
    },
    doc6: {
        title: "Portfolio 2024",
        description: "Showcase d'innovations récentes brillant comme des étoiles : projets full-stack, expérimentations UI et solutions techniques créatives dans l'espace digital.",
        tags: ["Portfolio", "Innovation", "Full-Stack", "Creative Tech", "Stellar Work"],
        links: [
            { text: "Explorer le Portfolio Cosmique", url: "#portfolio2024" }
        ]
    }
};

// Connexions organiques avec effet de flow cosmique
function createOrganicConnections() {
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

    connections.forEach((conn, index) => {
        const fromNode = document.querySelector(`[data-id="${conn.from}"]`);
        const toNode = document.querySelector(`[data-id="${conn.to}"]`);
        
        if (fromNode && toNode) {
            const connection = document.createElement('div');
            connection.className = 'connection';
            connection.style.animationDelay = `${index * 0.3}s`;
            
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
            
            // Rayons augmentés pour masquer sous les bulles
            const fromRadius = fromNode.classList.contains('central-node') ? 35 : 
                              fromNode.classList.contains('theme-node') ? 28 : 20;
            const toRadius = toNode.classList.contains('central-node') ? 35 : 
                            toNode.classList.contains('theme-node') ? 28 : 20;
            
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

// Interface de carte avec transition classique
function showCard(nodeId) {
    const data = nodeData[nodeId];
    if (!data) return;

    // Transition classique simple
    document.getElementById('cardTitle').textContent = data.title;
    document.getElementById('cardDescription').textContent = data.description;

    // Tags avec animation différée
    const metaContainer = document.getElementById('cardMeta');
    metaContainer.innerHTML = '';
    if (data.tags) {
        data.tags.forEach((tag, index) => {
            const tagElement = document.createElement('div');
            tagElement.className = 'card-tag';
            tagElement.textContent = tag;
            tagElement.style.animationDelay = `${index * 0.1}s`;
            metaContainer.appendChild(tagElement);
        });
    }

    // Actions
    const actionsContainer = document.getElementById('cardActions');
    actionsContainer.innerHTML = '';
    
    if (data.links) {
        data.links.forEach((link, index) => {
            const linkElement = document.createElement('a');
            linkElement.className = 'card-link';
            linkElement.href = link.url;
            linkElement.textContent = link.text;
            linkElement.style.animationDelay = `${index * 0.15}s`;
            actionsContainer.appendChild(linkElement);
        });
    }

    // Documents
    const docsList = document.getElementById('docsList');
    if (data.docs) {
        docsList.style.display = 'block';
        docsList.innerHTML = '';
        data.docs.forEach((doc, index) => {
            const docElement = document.createElement('div');
            docElement.className = 'doc-item';
            docElement.textContent = doc;
            docElement.style.animationDelay = `${index * 0.1}s`;
            docElement.addEventListener('click', () => {
                hideCard();
                const docId = Object.keys(nodeData).find(key => 
                    nodeData[key].title === doc
                );
                if (docId) {
                    setTimeout(() => showCard(docId), 200);
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

function hideCard() {
    overlay.classList.remove('active');
    card.classList.remove('active');
}

// Event listeners avec feedback tactile cosmique
document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Effet de ripple simple au clic
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(230, 194, 148, 0.4)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '80px';
        ripple.style.height = '80px';
        ripple.style.marginLeft = '-40px';
        ripple.style.marginTop = '-40px';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '5';
        
        node.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
        
        showCard(node.dataset.id);
    });

    // Effet hover
    node.addEventListener('mouseenter', () => {
        isInteracting = true;
    });
    
    node.addEventListener('mouseleave', () => {
        isInteracting = false;
    });
});

// Animation de ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

cardClose.addEventListener('click', hideCard);
overlay.addEventListener('click', hideCard);

// Initialisation
setTimeout(() => {
    createOrganicConnections();
    
    // Animation d'entrée séquentielle des nœuds
    document.querySelectorAll('.node').forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            node.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            node.style.opacity = '1';
            node.style.transform = 'translate(-50%, -50%) scale(1)';
        }, index * 150);
    });
}, 800);

// Recréation des connexions au resize
window.addEventListener('resize', () => {
    setTimeout(() => {
        createOrganicConnections();
    }, 100);
});

// Gestion des touches pour l'accessibilité
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && card.classList.contains('active')) {
        hideCard();
    }
});

// Performance monitoring simplifié
let fps = 0;
let lastTime = performance.now();

function monitorPerformance() {
    const currentTime = performance.now();
    fps = 1000 / (currentTime - lastTime);
    lastTime = currentTime;
    
    // Ajustement automatique des animations si performance faible
    if (fps < 30) {
        document.documentElement.style.setProperty('--animation-speed', '0.7');
    } else {
        document.documentElement.style.setProperty('--animation-speed', '1');
    }
    
    requestAnimationFrame(monitorPerformance);
}

monitorPerformance();