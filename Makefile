.PHONY: help install dev build preview clean deploy lint format

# Variables
NPM := npm
NODE := node

# Couleurs pour l'affichage
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

help: ## Affiche l'aide des commandes disponibles
	@echo "$(BLUE)╔═══════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║$(NC)  $(GREEN)École Interactive - Commandes disponibles$(NC)         $(BLUE)║$(NC)"
	@echo "$(BLUE)╚═══════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-12s$(NC) %s\n", $$1, $$2}'
	@echo ""

install: ## Installation des dépendances (npm install)
	@echo "$(GREEN)📦 Installation des dépendances...$(NC)"
	$(NPM) install
	@echo "$(GREEN)✅ Installation terminée !$(NC)"

dev: ## Lancement du serveur de développement
	@echo "$(GREEN)🚀 Démarrage du serveur de développement...$(NC)"
	$(NPM) run dev

build: ## Build de production
	@echo "$(GREEN)🔨 Build du projet...$(NC)"
	$(NPM) run build
	@echo "$(GREEN)✅ Build terminé ! Fichiers dans ./dist$(NC)"

preview: ## Preview du build local
	@echo "$(GREEN)👀 Preview du build...$(NC)"
	$(NPM) run preview

clean: ## Nettoyage des fichiers générés
	@echo "$(YELLOW)🧹 Nettoyage en cours...$(NC)"
	rm -rf dist node_modules .astro
	@echo "$(GREEN)✅ Nettoyage terminé !$(NC)"

deploy: build ## Build + déploiement manuel (si nécessaire)
	@echo "$(GREEN)🚀 Déploiement...$(NC)"
	@echo "$(YELLOW)⚠️  Normalement, le déploiement se fait automatiquement via GitHub Actions$(NC)"
	@echo "$(YELLOW)⚠️  Poussez vos changements sur la branche main pour déclencher le déploiement$(NC)"

lint: ## Linting du code
	@echo "$(GREEN)🔍 Analyse du code...$(NC)"
	$(NPM) run lint

format: ## Formatage du code (Prettier)
	@echo "$(GREEN)✨ Formatage du code...$(NC)"
	$(NPM) run format
	@echo "$(GREEN)✅ Code formaté !$(NC)"

check: ## Vérification TypeScript
	@echo "$(GREEN)🔍 Vérification TypeScript...$(NC)"
	$(NPM) run astro check

test-build: clean install build ## Nettoyage complet, installation et build (test CI/CD local)
	@echo "$(GREEN)✅ Test de build complet réussi !$(NC)"
