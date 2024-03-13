        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <a class="nav-link" href="<?= base_url() ?>">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </a>
                        <?php if (session()->get('akses') == 'Admin') : ?>
                            <a class="nav-link" href="<?= base_url('kerusakan') ?>">
                                <div class="sb-nav-link-icon"><i class="fas fa-house-damage"></i></div>
                                Kerusakan
                            </a>
                            <a class="nav-link" href="<?= base_url('gejala') ?>">
                                <div class="sb-nav-link-icon"><i class="fab fa-uncharted"></i></i></div>
                                Gejala
                            </a>
                            <a class="nav-link" href="<?= base_url('keluhan') ?>">
                                <div class="sb-nav-link-icon"><i class="fa fa-exclamation-circle"></i></div>
                                Daftar Keluhan
                            </a>
                        <?php endif; ?>
                        <?php if (session()->get('akses') == 'Pelanggan') : ?>
                            <a class="nav-link" href="<?= base_url('keluhan') ?>">
                                <div class="sb-nav-link-icon"><i class="fa fa-exclamation-circle"></i></div>
                                Keluhan
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>