<?php
/**
 * Hello Elementor Child · IRM Servicios
 * - Encola el CSS del tema hijo (tokens de marca).
 * - Fuentes Manrope e Inter: cargar como fuentes locales desde Elementor → Fuentes personalizadas
 *   (RGPD) o descomentar el enqueue de Google Fonts si se acepta la llamada externa.
 * - Script de campos ocultos UTM/gclid/fbclid (Paso 14) en assets/irm-tracking.js.
 */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'hello-elementor-child', get_stylesheet_uri(), [ 'hello-elementor' ], '1.0.0' );
	// wp_enqueue_style( 'irm-fonts', 'https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500;600&display=swap', [], null );
	wp_enqueue_script( 'irm-tracking', get_stylesheet_directory_uri() . '/assets/irm-tracking.js', [], '1.0.0', true );
}, 20 );
