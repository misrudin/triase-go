<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- PWA  -->
        <meta name="theme-color" content="#FFF"/>
        <link rel="apple-touch-icon" href="{{ asset('logo.png') }}">
        <link rel="manifest" href="{{ asset('/manifest.json') }}">

        <!-- Scripts -->
        @routes
        {{-- @viteReactRefresh --}}
        {{-- @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"]) --}}

        @php
            $isProduction = app()->environment('production');
            $manifestPath = base_path('../public_html/build/manifest.json');

            $manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : [];
        @endphp

        @if ($isProduction && !empty($manifest))
            @php
                $jsFiles = [];
                $cssFiles = [];

                $defaultJsKey = 'resources/js/app.jsx';
                $pageJsKey = "resources/js/Pages/{$page['component']}.jsx";

                if (isset($manifest[$defaultJsKey]['file'])) {
                    $jsFiles[] = $manifest[$defaultJsKey]['file'];
                }

                if (isset($manifest[$pageJsKey]['file'])) {
                    $jsFiles[] = $manifest[$pageJsKey]['file'];
                }

                if (!empty($manifest[$defaultJsKey]['css'])) {
                    $cssFiles = array_merge($cssFiles, $manifest[$defaultJsKey]['css']);
                }

                if (!empty($manifest[$pageJsKey]['css'])) {
                    $cssFiles = array_merge($cssFiles, $manifest[$pageJsKey]['css']);
                }
            @endphp

            @foreach ($cssFiles as $cssFile)
                <link rel="stylesheet" href="{{ asset('build/' . ltrim($cssFile, '/')) }}">
            @endforeach

            @foreach ($jsFiles as $jsFile)
                <script type="module" src="{{ asset('build/' . ltrim($jsFile, '/')) }}"></script>
            @endforeach
        @else
            @viteReactRefresh
            @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @endif

        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-slate-50">
        @inertia

        <script src="{{ asset('/sw.js') }}"></script>
        <script>
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").then(
            (registration) => {
                console.log("Service worker registration succeeded:", registration);
            },
            (error) => {
                console.error(`Service worker registration failed: ${error}`);
            },
            );
        } else {
            console.error("Service workers are not supported.");
        }
        </script>
    </body>
</html>
